<script lang="ts">
  import type { StepperProperties } from './properties';
  import Step from './Step.svelte';

  let { steps, currentStepIndex, classes, testId, onhandlestepclick }: StepperProperties = $props();
</script>

<div class="container {classes ?? ''}" data-pw={testId}>
  {#each steps as currentStep, stepIndex (stepIndex)}
    <div
      class:active-step={currentStepIndex === stepIndex}
      class:completed-step={currentStepIndex > stepIndex}
      class="step-container"
    >
      <Step
        onclick={onhandlestepclick}
        label={currentStep.label}
        icon={currentStep.icon}
        stepIndex={stepIndex + 1}
      />
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: var(--stepper-flex-direction, row);
    align-items: center;
  }

  .step-container:last-child {
    --step-separator-display: none;
  }

  .step-container {
    display: flex;
    align-items: center;
  }

  .active-step {
    --step-text-color: var(--step-text-active-color, currentColor);
    --step-separator-background-image-color: var(
      --step-separator-background-image-active-color,
      currentColor
    );
    --step-index-container-background-color: var(
      --step-index-container-active-background-color,
      currentColor
    );
  }

  .completed-step {
    --step-text-color: var(--step-text-completed-color, currentColor);
    --step-separator-background-image-color: var(
      --step-separator-background-image-completed-color,
      currentColor
    );
    --step-index-container-background-color: var(
      --step-index-container-completed-background-color,
      currentColor
    );
  }
</style>
