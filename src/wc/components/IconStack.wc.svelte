<svelte:options
  customElement={{
    tag: 'pui-icon-stack',
    shadow: 'open',
    props: {
      icons: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' }
    }
  }}
/>

<script lang="ts">
  import IconStack from '$lib/IconStack/IconStack.svelte';
  let props = $props();
</script>

<IconStack {...props} />
