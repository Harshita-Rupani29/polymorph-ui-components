<script lang="ts">
  import { onMount } from 'svelte';
  import type { Action } from 'svelte/action';
  import type { ChatBarMode, ChatBarProperties } from './properties';

  const MORPH_TIMEOUT_BUFFER_MS = 200;

  type PlacementKey = {
    mode: ChatBarMode;
    anchor: HTMLElement | null;
    maxWidth: number;
    bottomGutter: number;
    sideGutter: number;
  };

  let {
    children,
    mode = 'docked',
    anchor = null,
    maxWidth = 720,
    bottomGutter = 24,
    sideGutter = 32,
    morph = true,
    morphDuration = 750,
    active = false,
    onmorphend,
    testId,
    classes
  }: ChatBarProperties = $props();

  let hostEl: HTMLDivElement | null = $state(null);
  let x = $state(0);
  let y = $state(0);
  let width = $state(0);
  let ready = $state(false);
  let morphing = $state(false);

  let morphTimer: ReturnType<typeof setTimeout> | null = null;
  let morphEndFrame: number | null = null;
  let sizeObserver: ResizeObserver | null = null;
  // Latched once the bar is placed, so the first paint never counts as a mode change.
  let previousMode: ChatBarMode | null = null;

  function prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /**
   * Anchored mode tracks an element's box. Docked mode centres against the visual viewport
   * rather than the layout viewport, which is what keeps the bar above an on-screen keyboard
   * instead of being pushed off the bottom of the screen.
   */
  // Writes are guarded so an unchanged placement produces no state update. Without this, the
  // ResizeObserver below could re-trigger itself through the bar's own width change.
  function place(nextX: number, nextY: number, nextWidth: number): void {
    if (x !== nextX) {
      x = nextX;
    }
    if (y !== nextY) {
      y = nextY;
    }
    if (width !== nextWidth) {
      width = nextWidth;
    }
  }

  /** Returns whether a real placement was computed, so callers can avoid revealing an unplaced bar. */
  function sync(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    if (mode === 'anchored') {
      if (anchor === null) {
        return false;
      }
      const rect = anchor.getBoundingClientRect();
      place(rect.left, rect.top, rect.width);
      return true;
    }

    const viewport = window.visualViewport;
    const viewportWidth = viewport?.width ?? window.innerWidth;
    const viewportLeft = viewport?.offsetLeft ?? 0;
    const viewportBottom = (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight);
    // Clamped so hostile-but-legal props (a side gutter wider than the viewport, a negative max
    // width) degrade to a zero-width bar rather than emitting a negative CSS length.
    const barWidth = Math.max(0, Math.min(maxWidth, viewportWidth - sideGutter));

    place(
      viewportLeft + (viewportWidth - barWidth) / 2,
      viewportBottom - bottomGutter - (hostEl?.offsetHeight ?? 0),
      barWidth
    );
    return true;
  }

  /**
   * The bar stays hidden until a placement actually succeeds. In anchored mode that may be later
   * than mount, because the anchor can be resolved asynchronously rather than by a same-mount
   * `bind:this`.
   */
  function placeNow(): void {
    const placed = sync();
    if (!ready && placed) {
      previousMode = mode;
      ready = true;
    }
  }

  /**
   * placeNow() only writes state; Svelte flushes it to the DOM afterwards. Reporting completion
   * before that flush would let a listener measure the bar and read its pre-correction geometry,
   * contradicting the documented "settled" guarantee. An animation frame runs after that flush.
   */
  function reportMorphEnd(): void {
    if (typeof onmorphend !== 'function') {
      return;
    }
    const notify = onmorphend;
    if (morphEndFrame !== null) {
      cancelAnimationFrame(morphEndFrame);
    }
    morphEndFrame = requestAnimationFrame(() => {
      morphEndFrame = null;
      notify();
    });
  }

  /**
   * Watches its own box, the anchor, and the document element.
   *
   * Note the limit: ResizeObserver reports size changes, not position changes. An anchor that is
   * pushed down by late content above it does not resize, so it is the document element growing
   * that usually triggers the re-measure — "usually" because a shift contained inside a
   * fixed-size subtree changes neither. The window `load` and `scroll` listeners cover the
   * common remainder; a guaranteed position watch would need polling, which is not worth it.
   */
  function observeTargets(): void {
    if (sizeObserver === null) {
      return;
    }
    sizeObserver.disconnect();
    if (hostEl !== null) {
      sizeObserver.observe(hostEl);
    }
    if (anchor !== null) {
      sizeObserver.observe(anchor);
    }
    sizeObserver.observe(document.documentElement);
  }

  function finishMorph(): void {
    if (!morphing) {
      return;
    }
    if (morphTimer !== null) {
      clearTimeout(morphTimer);
      morphTimer = null;
    }
    morphing = false;
    // Resize callbacks are suppressed for the whole transition, so this is the first chance to
    // account for a height change caused by the morph itself — a wider bar can wrap its input on
    // fewer lines, and docked `y` is measured from the bar's own height. Runs before the callback
    // so listeners observe settled geometry.
    placeNow();
    reportMorphEnd();
  }

  function beginMorph(): void {
    if (!morph || prefersReducedMotion() || hostEl === null) {
      // Place before reporting completion, so the immediate path keeps the same ordering
      // guarantee as the animated one.
      placeNow();
      reportMorphEnd();
      return;
    }
    morphing = true;
    if (morphTimer !== null) {
      clearTimeout(morphTimer);
    }
    // transitionend can be missed if the bar is off-screen or the transition is interrupted,
    // so a timer guarantees onmorphend always fires and callers are never left awaiting it.
    morphTimer = setTimeout(finishMorph, morphDuration + MORPH_TIMEOUT_BUFFER_MS);
  }

  function handleTransitionEnd(event: TransitionEvent): void {
    if (event.target !== hostEl || event.propertyName !== 'transform') {
      return;
    }
    finishMorph();
  }

  // Re-placement is driven by an action keyed on the inputs that affect geometry, matching the
  // pinToBottom idiom in ChatMessageList. The key is an object rather than a string so that
  // swapping one anchor element for another is seen as a change — a `anchor !== null` string
  // would read identically before and after — without needing identity bookkeeping here.
  // $derived recomputes only when one of these actually changes, so `update` fires exactly then.
  let placementKey = $derived({ mode, anchor, maxWidth, bottomGutter, sideGutter });

  const placement: Action<HTMLElement, PlacementKey> = () => {
    function apply(): void {
      observeTargets();
      if (ready && previousMode !== null && mode !== previousMode) {
        previousMode = mode;
        beginMorph();
      }
      placeNow();
    }
    return { update: apply };
  };

  onMount(() => {
    const reposition = (): void => placeNow();

    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, { passive: true });
    // Late images finishing can move an anchor without resizing anything we observe. Resource
    // load events do not bubble, so this only sees them during the capture phase.
    window.addEventListener('load', reposition, true);
    window.visualViewport?.addEventListener('resize', reposition);
    window.visualViewport?.addEventListener('scroll', reposition);

    // First placement waits a frame so the bar has a measured height, then reveals it —
    // otherwise it would visibly jump from the top-left corner into position.
    const frame = requestAnimationFrame(() => {
      if (typeof ResizeObserver !== 'undefined') {
        sizeObserver = new ResizeObserver(() => {
          if (!morphing) {
            placeNow();
          }
        });
        observeTargets();
      }
      placeNow();
    });

    // Webfonts can change the bar's height after first paint.
    void document.fonts?.ready.then(() => {
      if (!morphing) {
        placeNow();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      if (morphEndFrame !== null) {
        cancelAnimationFrame(morphEndFrame);
        morphEndFrame = null;
      }
      sizeObserver?.disconnect();
      sizeObserver = null;
      if (morphTimer !== null) {
        clearTimeout(morphTimer);
        morphTimer = null;
      }
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition);
      window.removeEventListener('load', reposition, true);
      window.visualViewport?.removeEventListener('resize', reposition);
      window.visualViewport?.removeEventListener('scroll', reposition);
    };
  });
</script>

<div
  class="chat-bar {classes ?? ''}"
  class:ready
  class:morphing
  class:active
  class:anchored={mode === 'anchored'}
  class:docked={mode === 'docked'}
  bind:this={hostEl}
  use:placement={placementKey}
  style:transform="translate({x}px, {y}px)"
  style:width="{width}px"
  style:--chat-bar-morph-duration="{morphDuration}ms"
  ontransitionend={handleTransitionEnd}
  data-pw={testId}
>
  {@render children()}
</div>

<style>
  .chat-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--chat-bar-z-index, 60);
    box-sizing: border-box;
    min-height: var(--chat-bar-min-height, 0);
    padding: var(--chat-bar-padding, 0);
    background: var(--chat-bar-background, transparent);
    border: var(--chat-bar-border, none);
    border-radius: var(--chat-bar-border-radius, 0);
    box-shadow: var(--chat-bar-box-shadow, none);
    filter: var(--chat-bar-filter, none);
    opacity: 0;
    pointer-events: none;
    will-change: transform, width;
  }

  .chat-bar.ready {
    opacity: 1;
    pointer-events: auto;
  }

  .chat-bar.morphing {
    transition:
      transform var(--chat-bar-morph-duration, 750ms)
        var(--chat-bar-morph-easing, cubic-bezier(0.6, 0.05, 0.05, 0.95)),
      width var(--chat-bar-morph-duration, 750ms)
        var(--chat-bar-morph-easing, cubic-bezier(0.6, 0.05, 0.05, 0.95));
  }

  /* An outline ring that consumers can light up while the bar is active. It is a masked
     border so a gradient can be used; inert until --chat-bar-ring-opacity is raised. */
  .chat-bar::before {
    content: '';
    position: absolute;
    inset: var(--chat-bar-ring-inset, -1px);
    border-radius: var(--chat-bar-ring-border-radius, var(--chat-bar-border-radius, 0));
    padding: var(--chat-bar-ring-width, 0px);
    background: var(--chat-bar-ring-background, none);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--chat-bar-ring-transition, 0.4s ease);
  }

  .chat-bar.active::before {
    opacity: var(--chat-bar-ring-opacity, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    .chat-bar.morphing {
      transition: none;
    }

    .chat-bar::before {
      transition: none;
    }
  }
</style>
