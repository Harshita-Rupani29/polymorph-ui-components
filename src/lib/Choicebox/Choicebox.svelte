<script lang="ts">
  import type { ChoiceboxProperties } from './properties';
  import checkmarkSvg from '$lib/assets/checkmark.svg?raw';

  let {
    children,
    selected = $bindable(false),
    mode = 'radio',
    showIndicator = false,
    disabled = false,
    testId,
    onclick,
    classes
  }: ChoiceboxProperties = $props();

  function handleClick(): void {
    if (disabled) {
      return;
    }
    if (mode === 'radio' && selected) {
      return;
    }
    selected = !selected;
    onclick?.(selected);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class="choicebox {classes ?? ''}"
  class:selected
  class:disabled
  role={mode === 'radio' ? 'radio' : 'checkbox'}
  aria-checked={selected}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  data-pw={testId}
>
  <div class="body">
    {#if typeof children === 'function'}
      {@render children()}
    {/if}
  </div>
  {#if showIndicator}
    <span class="indicator {mode}" class:selected aria-hidden="true">
      {#if mode === 'checkbox' && selected}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        <span class="indicator-icon">{@html checkmarkSvg}</span>
      {/if}
    </span>
  {/if}
</div>

<style>
  .choicebox {
    display: var(--choicebox-display, flex);
    align-items: var(--choicebox-align-items, center);
    padding: var(--choicebox-padding, 16px);
    border: var(--choicebox-border, 2px solid currentColor);
    border-radius: var(--choicebox-border-radius, 6px);
    background: var(--choicebox-background, #ffffff);
    gap: var(--choicebox-gap, 12px);
    cursor: var(--choicebox-cursor, pointer);
    font-family: var(--choicebox-font-family, inherit);
    transition: var(--choicebox-transition, border-color 0.2s, background 0.2s);
    -webkit-tap-highlight-color: transparent;
  }

  .body {
    flex: var(--choicebox-body-flex, 1);
    min-width: var(--choicebox-body-min-width, 0);
    display: var(--choicebox-body-display, flex);
    align-items: var(--choicebox-body-align-items, var(--choicebox-align-items, center));
    gap: var(--choicebox-body-gap, var(--choicebox-gap, 12px));
  }

  .choicebox:focus-visible {
    outline: none;
    box-shadow: var(--choicebox-focus-ring, 0 0 0 3px currentColor);
  }

  .choicebox:not(.disabled):hover {
    border-color: var(--choicebox-hover-border-color, currentColor);
    background: var(--choicebox-hover-background, var(--choicebox-background, #ffffff));
  }

  .choicebox.selected {
    border-color: var(--choicebox-selected-border-color, currentColor);
    background: var(--choicebox-selected-background, var(--choicebox-background, #ffffff));
  }

  .choicebox.disabled {
    opacity: var(--choicebox-disabled-opacity, 0.4);
    cursor: var(--choicebox-disabled-cursor, not-allowed);
  }

  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--choicebox-indicator-size, 20px);
    height: var(--choicebox-indicator-size, 20px);
    border: var(--choicebox-indicator-border, 2px solid #757575);
    background: var(--choicebox-indicator-background, transparent);
    transition: var(--choicebox-indicator-transition, background 0.2s, border-color 0.2s);
  }

  .indicator.radio {
    border-radius: 50%;
  }

  .indicator.checkbox {
    border-radius: var(--choicebox-indicator-border-radius, var(--radius, 4px));
  }

  .indicator.selected {
    border: var(--choicebox-indicator-selected-border, 2px solid #2196f3);
    background: var(--choicebox-indicator-selected-background, #2196f3);
  }

  .indicator.radio.selected {
    box-shadow: inset 0 0 0 var(--choicebox-indicator-dot-inset, 4px)
      var(--choicebox-indicator-dot-color, #ffffff);
  }

  .indicator-icon {
    display: flex;
    width: var(--choicebox-indicator-icon-size, 14px);
    height: var(--choicebox-indicator-icon-size, 14px);
    color: var(--choicebox-indicator-icon-color, #ffffff);
  }

  .indicator-icon :global(svg) {
    width: 100%;
    height: 100%;
  }
</style>
