<script lang="ts">
  import type { StepProperties } from './properties';

  let { stepIndex, label, icon, classes, onclick, onkeydown }: StepProperties = $props();

  function handleStepClick() {
    onclick?.({ selectedIndex: stepIndex });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStepClick();
    }
    onkeydown?.(event);
  }
</script>

<div
  class="step {classes ?? ''}"
  onclick={handleStepClick}
  onkeydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-label={label}
>
  {#if typeof icon === 'string' && icon.length > 0}
    <div class="step-icon-container">
      <img class="step-icon" src={icon} alt="" />
    </div>
  {:else}
    <div class="step-index-container">
      <div class="step-index-text">
        {stepIndex}
      </div>
    </div>
  {/if}
  <div class="step-text">
    {label}
  </div>
  <div class="separator"></div>
</div>

<style>
  .step {
    display: flex;
    flex-direction: var(--step-flex-direction, row);
    align-items: center;
  }

  .step-index-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--step-index-container-height, 30px);
    width: var(--step-index-container-width, 30px);
    border-radius: var(--step-index-container-radius, 50%);
    background-color: var(--step-index-container-background-color, currentColor);
  }

  .separator {
    display: var(--step-separator-display, block);
    height: var(--step-separator-height, 1px);
    width: var(--step-separator-width, 50px);
    margin: var(--step-separator-margin, 0px 12px 0px 12px);
    background-image: var(
      --step-separator-background-image,
      repeating-linear-gradient(
        to right,
        var(--step-separator-background-image-color, currentColor),
        var(--step-separator-background-image-color, currentColor) 6px,
        transparent 6px,
        transparent 10px
      )
    );
  }

  .step-text {
    margin: var(--step-text-margin, 0px 0px 0px 12px);
    font-size: var(--step-text-font-size, inherit);
    color: var(--step-text-color, inherit);
  }

  .step-index-text {
    font-size: var(--step-index-font-size, 14px);
    color: var(--step-index-color, white);
  }
</style>
