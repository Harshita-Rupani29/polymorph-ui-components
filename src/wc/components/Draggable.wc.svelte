<svelte:options
  customElement={{
    tag: 'pui-draggable',
    shadow: 'open',
    props: {
      x: { type: 'Number', reflect: true },
      y: { type: 'Number', reflect: true },
      axis: { type: 'String', reflect: true },
      handle: { type: 'String', reflect: true },
      bounds: { type: 'String', reflect: true },
      disabled: { type: 'Boolean', reflect: true },
      step: { type: 'Number' },
      dragLabel: { type: 'String', attribute: 'drag-label' },
      children: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      ondragstart: { type: 'Object' },
      ondrag: { type: 'Object' },
      ondragend: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Draggable from '$lib/Draggable/Draggable.svelte';
  let props = $props();
</script>

<Draggable {...props} />
