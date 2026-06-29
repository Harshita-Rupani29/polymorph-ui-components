<script lang="ts">
  import Chat from '$lib/Chat/Chat.svelte';
  import Resizable from '$lib/Resizable/Resizable.svelte';
  import { ChatController } from '$lib/Chat/controller.svelte';
  import type { ChatTransport } from '$lib/Chat/types';

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const mockTransport: ChatTransport = async ({ message, signal }, handlers) => {
    handlers.onToolStatus?.({ label: 'Searching the catalog…' });
    await delay(700);
    if (signal.aborted) {
      return;
    }
    handlers.onToolStatus?.(null);

    const reply = `Thanks for asking about "${message}". This reply streams in word by word, and you can stop, copy, or retry it.`;
    for (const word of reply.split(' ')) {
      if (signal.aborted) {
        return;
      }
      handlers.onText(`${word} `);
      await delay(45);
    }
    handlers.onDone?.();
  };

  const chat = new ChatController({ transport: mockTransport, typewriter: true });
  let value = $state('');
  let attachments: File[] = $state([]);
  let recording = $state(false);
  let panelWidth = $state(420);
  let panelHeight = $state(600);
</script>

<div class="page-header">
  <span class="category-badge">Chat</span>
  <h1>Chat</h1>
</div>

<Resizable
  bind:width={panelWidth}
  bind:height={panelHeight}
  minWidth={340}
  maxWidth={640}
  minHeight={420}
  maxHeight={760}
  handles={['right', 'bottom', 'bottom-right']}
  classes="chat-theme chat-card"
>
  <Chat
    messages={chat.messages}
    bind:value
    bind:attachments
    image="https://picsum.photos/64?random=7"
    title="Shopping Assistant"
    subtitle="Online"
    placeholder="Ask anything…"
    streaming={chat.isStreaming}
    {recording}
    toolStatus={chat.toolStatus}
    suggestions={['Recommend a gift', 'Track my order', 'Return policy?']}
    accept="image/*"
    multiple
    allowCopy
    onsend={(text) => chat.send(text)}
    onstop={() => chat.stop()}
    onretry={() => chat.retry()}
    onvoice={() => (recording = !recording)}
    onattach={() => {}}
    onfeedback={() => {}}
    onclose={() => {}}
  >
    {#snippet headerContent()}
      <div class="header-note">Powered by your own transport — fully decoupled</div>
    {/snippet}
  </Chat>
</Resizable>

<p class="demo-note">
  Drag the right / bottom edge or corner to resize. {panelWidth} × {panelHeight}
</p>

<style>
  .header-note {
    font-size: 11px;
    color: var(--doc-text-muted, #71717a);
    background: var(--doc-accent-bg, #eef2ff);
    border-radius: 999px;
    padding: 3px 10px;
    width: fit-content;
  }
</style>
