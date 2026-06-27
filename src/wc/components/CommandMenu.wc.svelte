<svelte:options
  customElement={{
    tag: 'pui-command-menu',
    shadow: 'open',
    props: {
      items: { type: 'Object' },
      open: { type: 'Boolean', reflect: true },
      placeholder: { type: 'String', reflect: true },
      emptyText: { type: 'String', reflect: true, attribute: 'empty-text' },
      testId: { type: 'String', attribute: 'test-id' },
      itemIcon: { type: 'Object' },
      searchIcon: { type: 'Object' },
      classes: { type: 'String' },
      onselect: { type: 'Object' },
      onclose: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import CommandMenu from '$lib/CommandMenu/CommandMenu.svelte';
  let props = $props();
</script>

<CommandMenu {...props}>
  {#snippet searchIcon()}
    <slot name="search-icon"></slot>
  {/snippet}
</CommandMenu>
