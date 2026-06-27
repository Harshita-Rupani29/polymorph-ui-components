<svelte:options
  customElement={{
    tag: 'pui-input',
    shadow: 'open',
    props: {
      value: { type: 'String', reflect: true },
      placeholder: { type: 'String', reflect: true },
      dataType: { type: 'String', reflect: true, attribute: 'data-type' },
      label: { type: 'String', reflect: true },
      onErrorMessage: { type: 'String', attribute: 'on-error-message' },
      infoMessage: { type: 'String', attribute: 'info-message' },
      validators: { type: 'Object' },
      disable: { type: 'Boolean', reflect: true },
      validationPattern: { type: 'Object' },
      inProgressPattern: { type: 'Object' },
      addFocusColor: { type: 'Boolean', attribute: 'add-focus-color' },
      maxLength: { type: 'Number', reflect: true, attribute: 'max-length' },
      minLength: { type: 'Number', reflect: true, attribute: 'min-length' },
      min: { type: 'Number', reflect: true },
      max: { type: 'Number', reflect: true },
      actionInput: { type: 'Boolean', attribute: 'action-input' },
      useTextArea: { type: 'Boolean', reflect: true, attribute: 'use-text-area' },
      autoComplete: { type: 'String', attribute: 'auto-complete' },
      name: { type: 'String', reflect: true },
      textTransformers: { type: 'Object' },
      textViewPresentation: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      role: { type: 'String', reflect: true },
      ariaExpanded: { type: 'Boolean', attribute: 'aria-expanded' },
      ariaAutocomplete: { type: 'String', attribute: 'aria-autocomplete' },
      ariaControls: { type: 'String', attribute: 'aria-controls' },
      ariaActivedescendant: { type: 'String', attribute: 'aria-activedescendant' },
      oninput: { type: 'Object' },
      onfocus: { type: 'Object' },
      onfocusout: { type: 'Object' },
      onblur: { type: 'Object' },
      onpaste: { type: 'Object' },
      onclick: { type: 'Object' },
      onstatechange: { type: 'Object' },
      onkeydown: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Input from '$lib/Input/Input.svelte';
  let props = $props();
</script>

<Input {...props} />
