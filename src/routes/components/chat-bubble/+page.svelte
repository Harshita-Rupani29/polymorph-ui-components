<script lang="ts">
  import Chat from '$lib/Chat/Chat.svelte';
  import ChatBubble from '$lib/ChatBubble/ChatBubble.svelte';
  import { ChatController } from '$lib/Chat/controller.svelte';
  import type { ChatTransport } from '$lib/Chat/types';

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const mockTransport: ChatTransport = async ({ message, signal }, handlers) => {
    await delay(500);
    if (signal.aborted) {
      return;
    }
    const reply = `You said "${message}". This is a floating chat bubble — click the launcher to toggle it.`;
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
  let open = $state(false);
</script>

<div class="page-header">
  <span class="category-badge">Chat</span>
  <h1>ChatBubble</h1>
</div>

<p class="demo-note">
  A launcher pinned to the corner of the viewport opens a floating chat panel. Drag the bubble — it
  snaps to the nearest screen edge on release (the default; pass <code>dragMode="free"</code> to keep
  it where dropped). Resize the open panel from its inner edges.
</p>

<ChatBubble bind:open label="Open chat" draggable resizable classes="chat-theme">
  <Chat
    messages={chat.messages}
    bind:value
    title="Shopping Assistant"
    subtitle="Online"
    placeholder="Ask anything…"
    streaming={chat.isStreaming}
    allowCopy
    onsend={(text) => chat.send(text)}
    onstop={() => chat.stop()}
    onclose={() => (open = false)}
  />
</ChatBubble>
