<script lang="ts">
  import Button from '../Button/Button.svelte';
  import ChatMessage from '../ChatMessage/ChatMessage.svelte';
  import chevronDownSvg from '$lib/assets/chevron-down.svg?raw';
  import { partyOf } from '../Chat/roles';
  import type { Action } from 'svelte/action';
  import type { ChatMessageData } from '../Chat/types';
  import type { ChatMessageFeedback } from '../ChatMessage/properties';
  import type { ChatMessageListProperties } from './properties';

  const NEAR_BOTTOM_THRESHOLD = 80;

  let {
    messages,
    autoscroll = true,
    message,
    empty,
    jumpLabel = 'Jump to latest',
    jumpIcon,
    allowCopy = false,
    avatar,
    avatarParty = 'both',
    groupAvatars = false,
    typing,
    messageAttachments,
    renderHtml,
    pinned,
    pinnedAfter,
    onretry,
    onfeedback,
    testId,
    classes
  }: ChatMessageListProperties = $props();

  let listEl: HTMLElement | null = $state(null);
  let atBottom = $state(true);

  let scrollKey = $derived(
    `${messages.length}:${messages.at(-1)?.content.length ?? 0}:${messages.at(-1)?.attachments?.length ?? 0}`
  );
  let showJump = $derived(!atBottom && messages.length > 0);
  let lastResponderId = $derived.by(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const candidate = messages.at(i);
      if (candidate && partyOf(candidate.role) === 'responder') {
        return candidate.id;
      }
    }
    return null;
  });

  // The pinned slot sits between two loops rather than being ordered with CSS so that DOM order
  // matches visual order for screen readers, and so the pinned node keeps its identity: it is a
  // fixed position in the template, so it is never torn down as messages arrive around it.
  let pinnedIndex = $derived.by(() => {
    if (typeof pinnedAfter !== 'function') {
      return -1;
    }
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const candidate = messages.at(i);
      if (typeof candidate !== 'undefined' && pinnedAfter(candidate, i)) {
        return i;
      }
    }
    return -1;
  });

  let headMessages = $derived(pinnedIndex < 0 ? messages : messages.slice(0, pinnedIndex + 1));
  let tailMessages = $derived(pinnedIndex < 0 ? [] : messages.slice(pinnedIndex + 1));

  // Whether this message is on a side that takes an avatar at all. Messages on the other side
  // get neither an avatar nor reserved space, so their bubbles stay flush with the edge.
  function avatarEligible(index: number): boolean {
    const current = messages.at(index);
    if (typeof avatar !== 'function' || typeof current === 'undefined') {
      return false;
    }
    return avatarParty === 'both' || partyOf(current.role) === avatarParty;
  }

  function showAvatar(index: number): boolean {
    if (!avatarEligible(index)) {
      return false;
    }
    if (!groupAvatars || index === 0) {
      return true;
    }
    const current = messages.at(index);
    const previous = messages.at(index - 1);
    if (typeof current === 'undefined' || typeof previous === 'undefined') {
      return true;
    }
    return partyOf(previous.role) !== partyOf(current.role);
  }

  function reserveAvatar(index: number): boolean {
    return avatarEligible(index) && groupAvatars && !showAvatar(index);
  }

  function retryFor(msg: ChatMessageData): (() => void) | null {
    if (
      typeof onretry === 'function' &&
      partyOf(msg.role) === 'responder' &&
      msg.id === lastResponderId
    ) {
      return onretry;
    }
    return null;
  }

  function feedbackFor(msg: ChatMessageData): ((value: ChatMessageFeedback) => void) | null {
    if (typeof onfeedback === 'function' && partyOf(msg.role) === 'responder') {
      return (value) => onfeedback?.(value, msg);
    }
    return null;
  }

  function isNearBottom(node: HTMLElement): boolean {
    return node.scrollHeight - node.scrollTop - node.clientHeight < NEAR_BOTTOM_THRESHOLD;
  }

  function handleScroll(event: Event & { currentTarget: HTMLElement }): void {
    atBottom = isNearBottom(event.currentTarget);
  }

  function scrollToBottom(): void {
    if (listEl !== null) {
      listEl.scrollTop = listEl.scrollHeight;
      atBottom = true;
    }
  }

  const pinToBottom: Action<HTMLElement, string> = (node) => {
    let previousCount = messages.length;

    function scroll(): void {
      const newMessage = messages.length > previousCount;
      previousCount = messages.length;
      if (autoscroll && (atBottom || newMessage)) {
        queueMicrotask(() => {
          node.scrollTop = node.scrollHeight;
        });
      }
    }

    // The message key alone cannot see everything that changes the list's height — attachments
    // rendering, a pinned card appearing, renderHtml output, or an image finishing. Watching the
    // subtree keeps the view pinned for those too.
    //
    // Unlike a newly appended message, growing content only keeps the list pinned while the reader
    // is already at the bottom.
    //
    // Coalesced to one scroll write per frame: token-by-token streaming fires a mutation per
    // character, and reading scrollHeight then writing scrollTop each time forces synchronous
    // layout on every one.
    let pinFrame: number | null = null;

    function keepPinned(): void {
      if (!autoscroll || !atBottom || pinFrame !== null) {
        return;
      }
      pinFrame = requestAnimationFrame(() => {
        pinFrame = null;
        if (autoscroll && atBottom) {
          node.scrollTop = node.scrollHeight;
        }
      });
    }

    const contentObserver = new MutationObserver(keepPinned);
    contentObserver.observe(node, { childList: true, subtree: true, characterData: true });

    // Image loads resize the list without mutating it; `load` does not bubble, so capture.
    node.addEventListener('load', keepPinned, true);

    scroll();
    return {
      update: scroll,
      destroy() {
        contentObserver.disconnect();
        node.removeEventListener('load', keepPinned, true);
        if (pinFrame !== null) {
          cancelAnimationFrame(pinFrame);
          pinFrame = null;
        }
      }
    };
  };
</script>

<div
  class="chat-message-list {classes ?? ''}"
  role="log"
  aria-live="polite"
  data-pw={testId}
  bind:this={listEl}
  onscroll={handleScroll}
  use:pinToBottom={scrollKey}
>
  {#if messages.length === 0 && typeof empty === 'function'}
    {@render empty()}
  {/if}

  {#each headMessages as msg, i (msg.id)}
    {@render row(msg, i)}
  {/each}

  {#if typeof pinned === 'function'}
    <!-- aria-live="off" opts this subtree out of the surrounding log. Pinned content is meant to
         hold stateful widgets (a checkout, a map, a player) whose internal updates are not
         conversation, and would otherwise be announced as if new messages had arrived. The node
         stays here so DOM order continues to match visual order. -->
    <div class="pinned" class:unanchored={pinnedIndex < 0} aria-live="off">{@render pinned()}</div>
  {/if}

  {#each tailMessages as msg, i (msg.id)}
    {@render row(msg, pinnedIndex + 1 + i)}
  {/each}

  {#if showJump}
    <div class="jump">
      <Button onclick={scrollToBottom} ariaLabel={jumpLabel}>
        {#if typeof jumpIcon === 'function'}
          {@render jumpIcon()}
        {:else}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html chevronDownSvg}
        {/if}
      </Button>
    </div>
  {/if}
</div>

{#snippet row(msg: ChatMessageData, index: number)}
  <!-- Declared per row so each closes over its own message. -->
  {#snippet messageAvatar()}{@render avatar?.(msg)}{/snippet}
  {#snippet messageAttachmentsFor()}{@render messageAttachments?.(msg)}{/snippet}

  {#if typeof message === 'function'}
    {@render message(msg)}
  {:else}
    <ChatMessage
      role={msg.role}
      content={msg.content}
      html={typeof renderHtml === 'function' ? renderHtml(msg) : msg.html}
      streaming={msg.streaming}
      status={msg.status}
      allowCopy={allowCopy && partyOf(msg.role) === 'responder'}
      reserveAvatar={reserveAvatar(index)}
      {typing}
      attachments={typeof messageAttachments === 'function' ? messageAttachmentsFor : null}
      onretry={retryFor(msg)}
      onfeedback={feedbackFor(msg)}
      {...showAvatar(index) ? { avatar: messageAvatar } : {}}
    />
  {/if}
{/snippet}

<style>
  .chat-message-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--chat-message-list-gap, 1rem);
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: var(--chat-message-list-padding, 0.75rem 1.5rem);
    scroll-behavior: var(--chat-message-list-scroll-behavior, smooth);
  }

  .pinned {
    box-sizing: border-box;
    width: 100%;
  }

  .pinned.unanchored {
    display: none;
  }

  .jump {
    position: sticky;
    bottom: var(--chat-message-list-jump-bottom, 8px);
    align-self: center;
    margin-top: var(--chat-message-list-jump-margin-top, 4px);
    --button-width: var(--chat-message-list-jump-size, 36px);
    --button-height: var(--chat-message-list-jump-size, 36px);
    --button-padding: var(--chat-message-list-jump-padding, 8px);
    --button-border-radius: var(--chat-message-list-jump-border-radius, 50%);
    --button-color: var(--chat-message-list-jump-background-color, #ffffff);
    --button-text-color: var(--chat-message-list-jump-color, #52525b);
    --button-border: var(--chat-message-list-jump-border, 1px solid #e4e4e7);
    --button-box-shadow: var(--chat-message-list-jump-box-shadow, 0 4px 12px rgba(0, 0, 0, 0.12));
    --button-content-gap: 0px;
    --button-hover-color: var(--chat-message-list-jump-hover-background-color, #f4f4f5);
  }

  .jump :global(svg) {
    height: 100%;
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .chat-message-list {
      scroll-behavior: auto;
    }
  }
</style>
