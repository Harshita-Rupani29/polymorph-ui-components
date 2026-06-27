<svelte:options
  customElement={{
    tag: 'pui-accordion',
    shadow: 'open',
    props: {
      expand: { type: 'Boolean', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' }
    }
  }}
/>

<script lang="ts">
  import Accordion from '$lib/Accordion/Accordion.svelte';
  let props = $props();
</script>

<Accordion {...props}>
  {#snippet children()}
    <slot></slot>
  {/snippet}
</Accordion>
