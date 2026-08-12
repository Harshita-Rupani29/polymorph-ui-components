<svelte:options
  customElement={{
    tag: 'pui-chat-bar',
    shadow: 'open',
    props: {
      mode: { type: 'String', reflect: true },
      anchor: { type: 'Object' },
      maxWidth: { type: 'Number', attribute: 'max-width' },
      bottomGutter: { type: 'Number', attribute: 'bottom-gutter' },
      sideGutter: { type: 'Number', attribute: 'side-gutter' },
      morph: { type: 'Boolean', reflect: true },
      morphDuration: { type: 'Number', attribute: 'morph-duration' },
      active: { type: 'Boolean', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onmorphend: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import ChatBar from '$lib/ChatBar/ChatBar.svelte';
  let props = $props();
</script>

<ChatBar {...props}>
  {#snippet children()}
    <slot></slot>
  {/snippet}
</ChatBar>
