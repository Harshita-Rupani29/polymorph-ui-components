<svelte:options
  customElement={{
    tag: 'pui-menu',
    shadow: 'open',
    props: {
      items: { type: 'Object' },
      open: { type: 'Boolean', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      role: { type: 'String', reflect: true },
      ariaLabel: { type: 'String', reflect: true, attribute: 'aria-label' },
      id: { type: 'String', reflect: true },
      onselect: { type: 'Object' },
      onopen: { type: 'Object' },
      onclose: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Menu from '$lib/Menu/Menu.svelte';
  let props = $props();
</script>

<Menu {...props}>
  {#snippet trigger()}
    <slot name="trigger"></slot>
  {/snippet}
</Menu>
