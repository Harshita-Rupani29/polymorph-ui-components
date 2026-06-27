<svelte:options
  customElement={{
    tag: 'pui-color-picker',
    shadow: 'open',
    props: {
      value: { type: 'String', reflect: true },
      label: { type: 'String', reflect: true },
      disabled: { type: 'Boolean', reflect: true },
      showValue: { type: 'Boolean', reflect: true, attribute: 'show-value' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onchange: { type: 'Object' },
      oninput: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import ColorPicker from '$lib/ColorPicker/ColorPicker.svelte';
  let props = $props();
</script>

<ColorPicker {...props} />
