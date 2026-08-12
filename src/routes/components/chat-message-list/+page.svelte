<script lang="ts">
  import ChatMessageList from '$lib/ChatMessageList/ChatMessageList.svelte';
  import Button from '$lib/Button/Button.svelte';
  import type { ChatMessageData } from '$lib/Chat/types';

  let messages = $state<ChatMessageData[]>([
    { id: '1', role: 'sender', content: 'What can you help me with?' },
    {
      id: '2',
      role: 'responder',
      content: 'I can help you find products, track orders, and more.'
    },
    {
      id: '3',
      role: 'responder',
      content: 'Here is your basket so far.',
      attachments: [{ type: 'cart' }]
    },
    { id: '4', role: 'sender', content: 'Find me a blue jacket.' },
    { id: '5', role: 'responder', content: 'Searching now…', streaming: true }
  ]);

  let appended = $state(0);

  function append(): void {
    appended += 1;
    messages.push({
      id: `extra-${appended}`,
      role: 'responder',
      content: `Follow-up message ${appended}`
    });
  }

  function isCart(value: unknown): boolean {
    return value !== null && typeof value === 'object' && 'type' in value && value.type === 'cart';
  }

  function hasCart(message: ChatMessageData): boolean {
    return (message.attachments ?? []).some(isCart);
  }
</script>

<div class="page-header">
  <span class="category-badge">Chat</span>
  <h1>ChatMessageList</h1>
</div>

<div class="demo-row">
  <Button onclick={append}>Append message</Button>
  <span class="readout">appended: <b data-pw="appended-count">{appended}</b></span>
</div>

<p class="hint">
  Avatars are grouped and limited to the responder side, attachments render only beneath messages
  that have them, and the pinned widget keeps its DOM node as messages arrive around it.
</p>

<div class="chat-theme chat-card list-frame">
  <ChatMessageList
    {messages}
    avatar={avatarSnippet}
    avatarParty="responder"
    groupAvatars
    messageAttachments={attachmentsSnippet}
    pinned={pinnedSnippet}
    pinnedAfter={hasCart}
  />
</div>

{#snippet avatarSnippet(message: ChatMessageData)}
  <span class="demo-avatar">{message.role.charAt(0).toUpperCase()}</span>
{/snippet}

{#snippet attachmentsSnippet(message: ChatMessageData)}
  {#if (message.attachments ?? []).length > 0}
    <div class="demo-attachment" data-pw="attachment">
      {(message.attachments ?? []).length} attachment(s)
    </div>
  {/if}
{/snippet}

{#snippet pinnedSnippet()}
  <div class="demo-pinned" data-pw="pinned-widget">Pinned widget — keeps its DOM node</div>
{/snippet}

<style>
  /* The list is `flex: 1` with `overflow-y: auto`, so it only scrolls inside a flex column of
     bounded height. Without these two lines it grows to fit its content and never scrolls. */
  .list-frame {
    display: flex;
    flex-direction: column;
    height: 360px;
    max-width: 480px;
    background: var(--doc-demo-bg);
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

  .demo-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #e4e4e7;
    color: #3f3f46;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .demo-attachment {
    padding: 6px 10px;
    border: 1px dashed #a1a1aa;
    border-radius: 8px;
    font-size: 0.75rem;
    color: #52525b;
  }

  .demo-pinned {
    padding: 10px 12px;
    border: 1px solid #a1a1aa;
    border-radius: 8px;
    background: #ffffff;
    font-size: 0.8rem;
    color: #3f3f46;
  }
</style>
