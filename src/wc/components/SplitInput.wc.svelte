<svelte:options
  customElement={{
    tag: 'pui-split-input',
    shadow: 'open',
    props: {
      values: { type: 'Object' },
      fields: { type: 'Object' },
      length: { type: 'Number', reflect: true },
      disabled: { type: 'Boolean', reflect: true },
      autoAdvance: { type: 'Boolean', reflect: true, attribute: 'auto-advance' },
      separator: { type: 'String', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onchange: { type: 'Object' },
      oninput: { type: 'Object' },
      oncomplete: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import SplitInput from '$lib/SplitInput/SplitInput.svelte';
  let props = $props();
</script>

<SplitInput {...props} />
