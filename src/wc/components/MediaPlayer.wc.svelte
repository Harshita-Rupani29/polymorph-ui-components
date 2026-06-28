<svelte:options
  customElement={{
    tag: 'pui-media-player',
    shadow: 'open',
    props: {
      src: { type: 'String', reflect: true },
      type: { type: 'String', reflect: true },
      alt: { type: 'String', reflect: true },
      fallback: { type: 'String', reflect: true },
      autoplay: { type: 'Boolean', reflect: true },
      loop: { type: 'Boolean', reflect: true },
      controls: { type: 'Boolean', reflect: true },
      playing: { type: 'Boolean', reflect: true },
      muted: { type: 'Boolean', reflect: true },
      playIcon: { type: 'Object' },
      pauseIcon: { type: 'Object' },
      muteIcon: { type: 'Object' },
      unmuteIcon: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onplay: { type: 'Object' },
      onpause: { type: 'Object' },
      onvolumechange: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import MediaPlayer from '$lib/MediaPlayer/MediaPlayer.svelte';
  let props = $props();
</script>

<MediaPlayer {...props} />
