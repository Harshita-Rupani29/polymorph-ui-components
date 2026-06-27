<svelte:options
  customElement={{
    tag: 'pui-loader',
    shadow: 'open',
    props: {
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' }
    }
  }}
/>

<script lang="ts">
  import Loader from '$lib/Loader/Loader.svelte';
  let props = $props();
</script>

<Loader {...props} />
