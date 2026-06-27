<svelte:options
  customElement={{
    tag: 'pui-input-button',
    shadow: 'open',
    props: {
      value: { type: 'String', reflect: true },
      inputProperties: { type: 'Object' },
      rightButtonProperties: { type: 'Object' },
      leftButtonProperties: { type: 'Object' },
      bottomButtonProperties: { type: 'Object' },
      classes: { type: 'String' },
      testId: { type: 'String', attribute: 'test-id' },
      inputEventProperties: { type: 'Object' },
      rightButtonEventProperties: { type: 'Object' },
      leftButtonEventProperties: { type: 'Object' },
      bottomButtonEventProperties: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import InputButton from '$lib/InputButton/InputButton.svelte';
  let props = $props();
</script>

<InputButton {...props}>
  {#snippet leftIcon()}
    <slot name="left-icon"></slot>
  {/snippet}
  {#snippet rightIcon()}
    <slot name="right-icon"></slot>
  {/snippet}
</InputButton>
