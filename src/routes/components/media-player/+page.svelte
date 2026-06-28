<script lang="ts">
  import MediaPlayer from '$lib/MediaPlayer/MediaPlayer.svelte';
</script>

<div class="page-header">
  <span class="category-badge">Media</span>
  <h1>MediaPlayer</h1>
</div>

<div class="demo-row">
  <MediaPlayer
    type="image"
    src="https://picsum.photos/300/400?random=80"
    alt="Sample still image"
  />
  <MediaPlayer
    type="video"
    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  />
</div>
