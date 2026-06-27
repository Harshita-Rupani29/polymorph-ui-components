<svelte:options
  customElement={{
    tag: 'pui-stepper',
    shadow: 'open',
    props: {
      steps: { type: 'Object' },
      currentStepIndex: { type: 'Number', reflect: true, attribute: 'current-step-index' },
      classes: { type: 'String' },
      testId: { type: 'String', attribute: 'test-id' },
      onhandlestepclick: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Stepper from '$lib/Stepper/Stepper.svelte';
  let props = $props();
</script>

<Stepper {...props} />
