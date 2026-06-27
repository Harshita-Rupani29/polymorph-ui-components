<svelte:options
  customElement={{
    tag: 'pui-grid-item',
    shadow: 'open',
    props: {
      icon: { type: 'String', reflect: true },
      text: { type: 'String', reflect: true },
      headerIcon: { type: 'String', reflect: true, attribute: 'header-icon' },
      showLoader: { type: 'Boolean', reflect: true, attribute: 'show-loader' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onclick: { type: 'Object' },
      onkeydown: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import GridItem from '$lib/GridItem/GridItem.svelte';
  let props = $props();
</script>

<GridItem {...props} />
