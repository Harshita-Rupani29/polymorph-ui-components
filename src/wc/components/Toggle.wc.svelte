<svelte:options
  customElement={{
    tag: 'pui-toggle',
    shadow: 'open',
    props: {
      checked: { type: 'Boolean', reflect: true },
      text: { type: 'String', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onclick: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Toggle from '$lib/Toggle/Toggle.svelte';
  let props = $props();
</script>

<Toggle {...props} />
