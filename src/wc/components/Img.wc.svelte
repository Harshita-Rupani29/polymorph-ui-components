<svelte:options
  customElement={{
    tag: 'pui-img',
    shadow: 'open',
    props: {
      src: { type: 'String', reflect: true },
      alt: { type: 'String', reflect: true },
      fallback: { type: 'String', reflect: true },
      classes: { type: 'String' },
      testId: { type: 'String', attribute: 'test-id' },
      onerror: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Img from '$lib/Img/Img.svelte';
  let props = $props();
</script>

<Img {...props} />
