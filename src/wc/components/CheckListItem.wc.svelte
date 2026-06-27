<svelte:options
  customElement={{
    tag: 'pui-check-list-item',
    shadow: 'open',
    props: {
      text: { type: 'String', reflect: true },
      checked: { type: 'Boolean', reflect: true },
      disabled: { type: 'Boolean', reflect: true },
      checkboxLabel: { type: 'Object' },
      classes: { type: 'String' },
      testId: { type: 'String', attribute: 'test-id' },
      onclick: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import CheckListItem from '$lib/CheckListItem/CheckListItem.svelte';
  let props = $props();
</script>

<CheckListItem {...props}>
  {#snippet checkboxLabel()}
    <slot name="checkbox-label"></slot>
  {/snippet}
</CheckListItem>
