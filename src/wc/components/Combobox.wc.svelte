<svelte:options
  customElement={{
    tag: 'pui-combobox',
    shadow: 'open',
    props: {
      items: { type: 'Object' },
      value: { type: 'String', reflect: true },
      inputValue: { type: 'String', attribute: 'input-value' },
      open: { type: 'Boolean', reflect: true },
      highlightedIndex: { type: 'Number', attribute: 'highlighted-index' },
      placeholder: { type: 'String', reflect: true },
      disabled: { type: 'Boolean', reflect: true },
      name: { type: 'String', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      noResultsText: { type: 'String', attribute: 'no-results-text' },
      ariaLabel: { type: 'String', attribute: 'aria-label' },
      filterFn: { type: 'Object' },
      inputProperties: { type: 'Object' },
      inputEventProperties: { type: 'Object' },
      itemSnippet: { type: 'Object' },
      emptySnippet: { type: 'Object' },
      inputPrefix: { type: 'Object' },
      inputSuffix: { type: 'Object' },
      dropdownHeader: { type: 'Object' },
      dropdownFooter: { type: 'Object' },
      onselect: { type: 'Object' },
      oninput: { type: 'Object' },
      onopen: { type: 'Object' },
      onclose: { type: 'Object' },
      onkeydown: { type: 'Object' },
      onfocus: { type: 'Object' },
      onblur: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Combobox from '$lib/Combobox/Combobox.svelte';
  let props = $props();
</script>

<Combobox {...props}>
  {#snippet inputPrefix()}
    <slot name="input-prefix"></slot>
  {/snippet}
  {#snippet inputSuffix()}
    <slot name="input-suffix"></slot>
  {/snippet}
  {#snippet emptySnippet()}
    <slot name="empty"></slot>
  {/snippet}
  {#snippet dropdownHeader()}
    <slot name="dropdown-header"></slot>
  {/snippet}
  {#snippet dropdownFooter()}
    <slot name="dropdown-footer"></slot>
  {/snippet}
</Combobox>
