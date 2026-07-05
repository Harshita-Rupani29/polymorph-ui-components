<svelte:options
  customElement={{
    tag: 'pui-gallery',
    shadow: 'open',
    props: {
      images: { type: 'Object' },
      view: { type: 'String', reflect: true },
      open: { type: 'Boolean', reflect: true },
      activeIndex: { type: 'Number', reflect: true, attribute: 'active-index' },
      enableLightbox: { type: 'Boolean', reflect: true, attribute: 'enable-lightbox' },
      loop: { type: 'Boolean', reflect: true },
      showCounter: { type: 'Boolean', reflect: true, attribute: 'show-counter' },
      showCaption: { type: 'Boolean', reflect: true, attribute: 'show-caption' },
      previousIcon: { type: 'Object' },
      nextIcon: { type: 'Object' },
      closeIcon: { type: 'Object' },
      editIcon: { type: 'Object' },
      deleteIcon: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onimageclick: { type: 'Object' },
      oneditclick: { type: 'Object' },
      ondeleteclick: { type: 'Object' },
      onopen: { type: 'Object' },
      onclose: { type: 'Object' },
      onchange: { type: 'Object' },
      onkeydown: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Gallery from '$lib/Gallery/Gallery.svelte';
  let props = $props();
</script>

<Gallery {...props} />
