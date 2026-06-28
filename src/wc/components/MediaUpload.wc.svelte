<svelte:options
  customElement={{
    tag: 'pui-media-upload',
    shadow: 'open',
    props: {
      label: { type: 'String', reflect: true },
      description: { type: 'String', reflect: true },
      addText: { type: 'String', attribute: 'add-text' },
      hintText: { type: 'String', attribute: 'hint-text' },
      maxLength: { type: 'Number', reflect: true, attribute: 'max-length' },
      accept: { type: 'String', reflect: true },
      maxFileSize: { type: 'Number', reflect: true, attribute: 'max-file-size' },
      multiple: { type: 'Boolean', reflect: true },
      dragAndDrop: { type: 'Boolean', reflect: true, attribute: 'drag-and-drop' },
      disabled: { type: 'Boolean', reflect: true },
      showCounter: { type: 'Boolean', reflect: true, attribute: 'show-counter' },
      showFileName: { type: 'Boolean', reflect: true, attribute: 'show-file-name' },
      showFileSize: { type: 'Boolean', reflect: true, attribute: 'show-file-size' },
      addIcon: { type: 'Object' },
      removeIcon: { type: 'Object' },
      fileIcon: { type: 'Object' },
      errorMessages: { type: 'Object' },
      files: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onchange: { type: 'Object' },
      onremove: { type: 'Object' },
      onerror: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import MediaUpload from '$lib/MediaUpload/MediaUpload.svelte';
  let props = $props();
</script>

<MediaUpload {...props} />
