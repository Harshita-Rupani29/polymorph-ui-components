<script lang="ts">
  import ChatBar from '$lib/ChatBar/ChatBar.svelte';
  import Button from '$lib/Button/Button.svelte';
  import Input from '$lib/Input/Input.svelte';

  let mode = $state<'anchored' | 'docked'>('anchored');
  let anchorEl: HTMLDivElement | null = $state(null);
  let value = $state('');
  let morphCount = $state(0);
  let settledGap = $state<number | null>(null);

  function toggle(): void {
    mode = mode === 'anchored' ? 'docked' : 'anchored';
  }

  // Measured inside the callback on purpose: onmorphend promises settled geometry, so reading the
  // bar here must already give its final position.
  function handleMorphEnd(): void {
    morphCount += 1;
    const bar = document.querySelector('.demo-bar');
    if (bar === null) {
      return;
    }
    settledGap = Math.round(window.innerHeight - bar.getBoundingClientRect().bottom);
  }
</script>

<div class="page-header">
  <span class="category-badge">Chat</span>
  <h1>ChatBar</h1>
</div>

<div class="demo-row">
  <Button onclick={toggle}>
    {mode === 'anchored' ? 'Dock to viewport' : 'Return to anchor'}
  </Button>
  <span class="readout">
    mode: <b>{mode}</b> &middot; morphs completed: <b>{morphCount}</b> &middot; settled gap:
    <b data-pw="settled-gap">{settledGap === null ? '—' : `${settledGap}px`}</b>
  </span>
</div>

<p class="hint">
  The bar tracks the dashed box while anchored, then docks to the bottom of the visual viewport.
  Resize the window or open a mobile keyboard to see it follow.
</p>

<div class="anchor" bind:this={anchorEl}>
  <span>anchor element</span>
</div>

<ChatBar
  {mode}
  anchor={anchorEl}
  active={value.length > 0}
  onmorphend={handleMorphEnd}
  classes="demo-bar"
>
  <Input bind:value placeholder="Ask anything…" />
</ChatBar>

<style>
  .anchor {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    max-width: 520px;
    border: 1px dashed #a1a1aa;
    border-radius: 28px;
    color: #71717a;
    font-size: 0.85rem;
  }

  .readout {
    font-size: 0.85rem;
    color: #52525b;
  }

  .hint {
    max-width: 60ch;
    color: #52525b;
    font-size: 0.9rem;
  }

  /* Theming the library component from the consumer side, which is the intended pattern. */
  :global(.demo-bar) {
    --chat-bar-border-radius: 28px;
    --chat-bar-background: #ffffff;
    --chat-bar-border: 1px solid #e4e4e7;
    --chat-bar-box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
    --chat-bar-padding: 8px 12px;
    --chat-bar-min-height: 56px;
    --chat-bar-ring-width: 2px;
    --chat-bar-ring-opacity: 1;
    --chat-bar-ring-background: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #6366f1);
  }
</style>
