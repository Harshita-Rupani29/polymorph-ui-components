<script lang="ts">
  import { validateInput } from '$lib/utils';
  import type { InputProperties } from './properties';
  import type { ValidationState } from '$lib/types';

  let {
    value = $bindable(''),
    placeholder = '',
    dataType = 'text',
    label = '',
    onErrorMessage = '',
    infoMessage = '',
    validators = [],
    disable = false,
    validationPattern = null,
    inProgressPattern = null,
    addFocusColor = false,
    maxLength = 1000,
    minLength = 0,
    min,
    max,
    actionInput = false,
    useTextArea = false,
    autoComplete = 'on',
    name = '',
    testId = '',
    textTransformers = [],
    textViewPresentation = [],
    onfocus = () => {},
    onfocusout = () => {},
    onblur = () => {},
    oninput = () => {},
    onpaste = () => {},
    onstatechange = () => {},
    onclick = () => {},
    onkeydown = () => {},
    classes,
    role,
    ariaExpanded,
    ariaAutocomplete,
    ariaControls,
    ariaActivedescendant
  }: InputProperties = $props();

  export function focus() {
    try {
      inputElement?.focus();
      inputElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      console.error('Error focusing or scrolling inputElement:', error);
    }
  }

  export function blur() {
    try {
      inputElement?.blur();
    } catch (error) {
      console.error('Error blurring inputElement:', error);
    }
  }

  export function getInputRef(): HTMLInputElement | HTMLTextAreaElement | null {
    return inputElement;
  }

  let inputElement: HTMLInputElement | HTMLTextAreaElement | null = $state(null);

  let validationState = $derived.by(() => {
    const valueValidation: ValidationState = validateInput(
      value,
      dataType,
      validationPattern,
      inProgressPattern,
      validators
    );
    if (
      valueValidation === 'InProgress' &&
      value.length > 0 &&
      inputElement !== null &&
      inputElement !== document.activeElement
    ) {
      return 'Invalid';
    }
    return valueValidation;
  });

  // eslint-disable-next-line no-restricted-syntax
  $effect(() => {
    onstatechange(validationState);
  });

  const showErrorMessage = $derived(validationState === 'Invalid');

  function handleOnInput(event: Event) {
    if (inputElement === null) {
      return;
    }

    let currentValue = inputElement.value;
    if (dataType === 'tel' && currentValue.length > 0) {
      currentValue = textTransformers.reduce((prevValue, currIndexFunction) => {
        let newValue = currIndexFunction(prevValue);
        return newValue;
      }, currentValue);
      currentValue = currentValue.replace(/\D+|\D/gm, '');
      const numberLength = currentValue.length;
      if (numberLength === 0) {
        inputElement.value = value;
        return;
      }
      if (numberLength > maxLength) {
        const existingInput = value;
        if (existingInput.length === maxLength) {
          inputElement.value = applyTextPresentation(value);
          return;
        }
        /**
         * choose last max length number of digits if length is bigger than max length passed in props
         */
        currentValue = currentValue.substring(numberLength - maxLength);
      }
      currentValue = applyTextPresentation(currentValue);
      inputElement.value = currentValue;
    }
    value = inputElement.value;
    oninput(inputElement.value, event);
  }

  /**
   *
   * @param event
   * ENABLED ONLY FOR 'dataType = tel'
   */
  function handleOnPaste(event: ClipboardEvent) {
    if (inputElement === null) {
      return;
    }

    if (event.clipboardData) {
      if (dataType === 'tel') {
        let unfilteredNumber = event.clipboardData.getData('text');
        unfilteredNumber = textTransformers.reduce((prevValue, currIndexFunction) => {
          let newValue = currIndexFunction(prevValue);
          return newValue;
        }, unfilteredNumber);
        /**
         * removes everything except numbers
         */
        const filteredNumber = unfilteredNumber.replace(/\D+|\D/gm, '');
        const filteredNumberLength = filteredNumber.length;
        /**
         * pasted text is non numeric
         */
        if (filteredNumber.length === 0) {
          event.preventDefault();
        }
        /**
         * user pasted 10+ digit number , overrides all cases
         */
        if (filteredNumber.length > maxLength) {
          /**
           * choose last max length number of digits if length is bigger than max length passed in props
           */
          const finalValue = applyTextPresentation(
            filteredNumber.substring(filteredNumberLength - maxLength)
          );
          // Adding reactivity
          value = finalValue;
          onpaste(event);
          event.preventDefault(); // prevent bubble and let finalValue be entered
        }
        /**
         * if numeric pasted text has length less than max length, bubble to oninput.
         */
      }
    }
  }

  function applyTextPresentation(currentValue: string): string {
    return textViewPresentation.reduce((prevValue, currIndexFunction) => {
      let newValue = currIndexFunction(prevValue);
      return newValue;
    }, currentValue);
  }

  function _onFocusOut(event: FocusEvent) {
    if (validationState === 'InProgress' && value.length > 0) {
      validationState = 'Invalid';
    }
    onfocusout(event);
    onblur(event);
  }
</script>

<div class="input-container {classes ?? ''}" class:input-error={showErrorMessage && !actionInput}>
  {#if typeof label === 'string' && label !== '' && !actionInput}
    <label class="label" for={name}>
      {label}
    </label>
  {/if}

  {#if useTextArea}
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <textarea
      {value}
      {placeholder}
      autocomplete={autoComplete}
      {name}
      {role}
      aria-expanded={ariaExpanded}
      aria-autocomplete={ariaAutocomplete}
      aria-controls={ariaControls}
      aria-activedescendant={ariaActivedescendant}
      {onfocus}
      onfocusout={_onFocusOut}
      oninput={handleOnInput}
      onpaste={handleOnPaste}
      {onclick}
      {onkeydown}
      class:action-input={actionInput}
      style="--input-focus-border-width: {addFocusColor ? 1 : 0}px;"
      disabled={disable}
      bind:this={inputElement}
      maxlength={dataType === 'tel' ? null : maxLength}
      minlength={minLength}
    />
  {:else}
    <input
      type={dataType}
      {value}
      {placeholder}
      autocomplete={autoComplete}
      {name}
      {role}
      aria-expanded={ariaExpanded}
      aria-autocomplete={ariaAutocomplete}
      aria-controls={ariaControls}
      aria-activedescendant={ariaActivedescendant}
      {onfocus}
      onfocusout={_onFocusOut}
      oninput={handleOnInput}
      onpaste={handleOnPaste}
      {onclick}
      {onkeydown}
      data-pw={testId}
      class:action-input={actionInput}
      disabled={disable}
      bind:this={inputElement}
      maxlength={dataType === 'tel' ? null : maxLength}
      minlength={minLength}
      {min}
      {max}
    />
  {/if}

  {#if onErrorMessage !== '' && showErrorMessage && !actionInput}
    <div class="error-message">
      {onErrorMessage}
    </div>
  {/if}
  {#if infoMessage !== '' && !actionInput}
    <div class="info-message">
      {infoMessage}
    </div>
  {/if}
</div>

<style>
  textarea,
  input {
    box-sizing: var(--input-box-sizing, border-box);
    height: var(--input-height, fit-content);
    background-color: var(--input-background, transparent);
    font-size: var(--input-font-size, 16px) !important;
    font-family: var(--input-font-family, inherit);
    border-radius: var(--input-radius, 6px);
    outline: none;
    padding: var(--input-padding, 10px 12px);
    font-weight: var(--input-font-weight, 500);
    width: var(--input-width, fit-content);
    margin: var(--input-margin, 0px 0px 12px 0px);
    appearance: none !important;
    -webkit-appearance: none !important; /* For Safari MWeb */
    box-shadow: var(--input-box-shadow, none);
    border: var(--input-border, 1px solid currentColor);
    resize: none;
    visibility: var(--input-visibility, visible);
    text-align: var(--input-text-align, left);
    color: var(--input-text-color);
  }

  textarea:focus,
  input:focus {
    border: var(--input-focus-border, 1px solid currentColor);
  }

  .input-error {
    --input-focus-border: var(
      --input-error-border,
      1px solid var(--input-error-msg-text-color, currentColor)
    ) !important;
    --input-border: var(
      --input-error-border,
      1px solid var(--input-error-msg-text-color, currentColor)
    ) !important;
  }

  .action-input {
    border-radius: var(--input-radius, 6px 0px 0px 6px);
    box-shadow: var(--input-box-shadow, none);
    margin-bottom: 0;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin: var(--input-container-margin, 0);
    padding: var(--input-container-padding, 0);
    width: var(--input-container-width, fit-content);
  }

  .label {
    font-weight: var(--input-label-msg-text-weight, 400);
    font-size: var(--input-label-msg-text-size, 12px);
    color: var(--input-label-msg-text-color, currentColor);
    margin: var(--input-label-msg-margin, 0px 0px 6px 0px);
    padding: var(--input-label-msg-padding);
  }

  .error-message {
    font-weight: var(--input-error-msg-text-weight, 400);
    font-size: var(--input-error-msg-text-size, 12px);
    color: var(--input-error-msg-text-color, currentColor);
    margin: var(--input-error-msg-margin);
    padding: var(--input-error-msg-padding);
  }

  .info-message {
    font-weight: var(--input-info-msg-text-weight, 400);
    font-size: var(--input-info-msg-text-size, 12px);
    color: var(--input-info-msg-text-color, currentColor);
    margin: var(--input-info-msg-margin);
    padding: var(--input-info-msg-padding);
  }

  ::placeholder {
    color: var(--input-placeholder-color, #a1a1aa);
  }
</style>
