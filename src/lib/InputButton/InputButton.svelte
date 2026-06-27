<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import Input from '$lib/Input/Input.svelte';
  import type { InputButtonProperties } from './properties';
  import type { ValidationState } from '$lib/types';
  import type { SvelteComponent } from 'svelte';

  let {
    value = $bindable(''),
    inputProperties,
    rightButtonProperties,
    leftButtonProperties,
    bottomButtonProperties,
    inputEventProperties,
    rightButtonEventProperties,
    leftButtonEventProperties,
    bottomButtonEventProperties,
    leftIcon,
    rightIcon,
    testId,
    classes
  }: InputButtonProperties = $props();

  let validationState = $state<ValidationState>('InProgress');

  let inputRef: SvelteComponent | null = $state(null);

  // Derive enable state for right button
  const isRightButtonEnabled = $derived(validationState === 'Valid');

  function rightButtonClick(event: MouseEvent): void {
    if (validationState === 'Valid') {
      rightButtonEventProperties?.onclick?.(event);
    }
  }

  function bottomButtonClick(event: MouseEvent): void {
    if (validationState === 'Valid') {
      bottomButtonEventProperties?.onclick?.(event);
    }
  }

  function triggerRightClickIfValid(event: KeyboardEvent): void {
    if (event?.key === 'Enter' && validationState === 'Valid') {
      rightButtonEventProperties?.onkeyup?.(event);
    }
  }

  function handleStateChange(state: ValidationState): void {
    validationState = state;
    inputEventProperties?.onstatechange?.(state);
  }

  export function focus() {
    inputRef?.focus();
  }

  export function blur() {
    inputRef?.blur();
  }
</script>

<div class="container {classes ?? ''}" data-pw={testId}>
  {#if inputProperties.label && inputProperties.label !== ''}
    <label class="label" for={inputProperties.name}>
      {inputProperties.label}
    </label>
  {/if}

  <div class="input-button-container">
    <div class="input-button {validationState === 'Invalid' ? 'invalid' : 'valid'}">
      {#if leftButtonProperties != null}
        <div class="left-button">
          <Button {...leftButtonProperties} {...leftButtonEventProperties} icon={leftIcon} />
        </div>
      {/if}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="input" onkeyup={triggerRightClickIfValid}>
        <Input
          {...inputProperties}
          {...inputEventProperties}
          bind:value
          bind:this={inputRef}
          onstatechange={handleStateChange}
          actionInput={true}
        />
      </div>
      {#if rightButtonProperties != null}
        <div class="right-button">
          <Button
            {...rightButtonProperties}
            enable={isRightButtonEnabled}
            onclick={rightButtonClick}
            icon={rightIcon}
          />
        </div>
      {/if}
    </div>
    {#if bottomButtonProperties != null}
      <div class="bottom-button">
        <Button {...bottomButtonProperties} onclick={bottomButtonClick} />
      </div>
    {/if}
  </div>
  {#if inputProperties.onErrorMessage !== '' && validationState === 'Invalid'}
    <div class="error-message">
      {inputProperties.onErrorMessage}
    </div>
  {/if}
  {#if inputProperties.infoMessage !== ''}
    <div class="info-message">
      {inputProperties.infoMessage}
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin: var(--input-button-container-margin);
  }

  .input-button-container {
    --button-width: 100%;
    --input-border: none;
    --input-focus-border: none;
    --input-box-shadow: none;
    --input-margin: none;
    --input-width: fit-content;
    height: var(--input-height, fit-content);
    font-size: var(--input-font-size, 16px) !important;
    font-weight: 500;
    margin: var(--input-button-margin);
    border-radius: var(--input-button-radius, 4px);
    border: var(--input-button-container-border);
    background: var(--input-button-container-background);
    padding: var(--input-button-container-padding);
  }

  .input-button {
    display: flex;
    align-items: center;
    border-radius: var(--input-button-radius, 4px);
    border: var(--input-button-border);
    box-shadow: var(--input-button-box-shadow, 0px 1px 8px currentColor);
    background: var(--input-button-background);
  }
  .input-button-container:focus-within {
    border: var(--input-button-focus-border);
  }
  .input {
    flex: 2;
    min-width: 0px;
  }

  .bottom-button {
    padding: var(--input-bottom-btn-padding, 10px 0px);
    --button-cursor: var(--input-button-bottom-cursor);
    --button-color: var(--input-button-bottom-color);
    --button-text-color: var(--input-button-bottom-text-color);
    --button-font-family: var(--input-button-bottom-font-family);
    --button-font-weight: var(--input-button-bottom-font-weight);
    --button-font-size: var(--input-button-bottom-font-size);
    --button-height: var(--input-button-bottom-height, 54px);
    --button-padding: var(--input-button-bottom-padding);
    --button-border-radius: var(--input-button-bottom-border-radius);
    --button-width: var(--input-button-bottom-width);
  }

  .label {
    font-weight: var(--input-label-msg-text-weight, 400);
    font-size: var(--input-label-msg-text-size, 12px);
    color: var(--input-label-msg-text-color, currentColor);
    line-height: var(--input-label-msg-text-line-height);
    margin: var(--input-label-msg-text-margin, 0px 0px 6px 0px);
  }

  .invalid {
    outline: var(--invalid-outline, 1px solid var(--input-field-error-stroke, currentColor));
  }

  .error-message {
    font-weight: var(--input-error-msg-text-weight, 400);
    font-size: var(--input-error-msg-text-size, 12px);
    color: var(--input-error-msg-text-color, currentColor);
    margin: var(--input-btn-error-msg-margin, 12px 0px 0px 0px);
  }

  .info-message {
    font-weight: var(--input-info-msg-text-weight, 400);
    font-size: var(--input-info-msg-text-size, 12px);
    color: var(--input-info-msg-text-color, currentColor);
    margin: var(--input-btn-info-msg-margin, 12px 0px 0px 0px);
  }

  .left-button {
    --button-color: var(--input-button-left-color);
    --button-text-color: var(--input-button-left-text-color);
    --button-font-family: var(--input-button-left-font-family);
    --button-font-weight: var(--input-button-left-font-weight);
    --button-font-size: var(--input-button-left-font-size);
    --button-height: var(--input-button-left-height, 54px);
    --button-padding: var(--input-button-left-padding);
    --button-border-radius: var(--input-button-left-border-radius);
    --button-width: var(--input-button-left-width);
    --button-cursor: var(--input-button-left-cursor);
    --button-opacity: var(--input-button-left-opacity);
    --button-border: var(--input-button-left-border);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    --button-content-gap: var(--input-button-left-content-gap);
    --button-content-flex-direction: var(--input-button-left-content-flex-direction, row);
    --button-icon-order: var(--input-button-left-icon-order);
    --button-icon-display: var(--input-button-left-icon-display);
    --button-text-order: var(--input-button-left-text-order);
    --button-disabled-cursor: var(--input-button-left-disabled-cursor);
    --button-disabled-opacity: var(--input-button-left-disabled-opacity);
  }

  .right-button {
    flex: var(--input-button-right-flex, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    min-width: var(--input-button-right-min-width, 0px);
    --button-color: var(--input-button-right-color);
    --button-text-color: var(--input-button-right-text-color);
    --button-font-family: var(--input-button-right-font-family);
    --button-font-weight: var(--input-button-right-font-weight);
    --button-font-size: var(--input-button-right-font-size);
    --button-height: var(--input-button-right-height, 54px);
    --button-padding: var(--input-button-right-padding);
    --button-border-radius: var(--input-button-right-border-radius, 0px 4px 4px 0px);
    --button-width: var(--input-button-right-width, 100%);
    --button-cursor: var(--input-button-right-cursor);
    --button-opacity: var(--input-button-right-opacity);
    --button-border: var(--input-button-right-border);
    --button-content-gap: var(--input-button-right-content-gap);
    --button-visibility: var(--input-button-right-visibility, visible);
    --button-content-flex-direction: var(--input-button-right-content-flex-direction, row);
    --button-icon-order: var(--input-button-right-icon-order);
    --button-icon-display: var(--input-button-right-icon-display);
    --button-text-order: var(--input-button-right-text-order);
    --button-disabled-cursor: var(--input-button-right-disabled-cursor);
    --button-disabled-opacity: var(--input-button-right-disabled-opacity);
  }
</style>
