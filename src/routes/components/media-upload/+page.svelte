<script lang="ts">
  import MediaUpload from '$lib/MediaUpload/MediaUpload.svelte';

  let images: File[] = $state([]);
  let documents: File[] = $state([]);
</script>

<div class="page-header">
  <span class="category-badge">Media</span>
  <h1>MediaUpload</h1>
</div>

<div class="demo-row">
  <MediaUpload
    label="Supporting Images"
    hintText="PNG or JPG, up to 5 MB"
    accept="image/*"
    maxFileSize={5 * 1024 * 1024}
    maxLength={4}
    multiple
    bind:files={images}
  />
</div>

<p class="demo-note">{images.length} image{images.length === 1 ? '' : 's'} attached.</p>

<div class="demo-row">
  <MediaUpload
    label="Attachments"
    description="Drag in PDFs or documents."
    addText="Drop files here"
    hintText="PDF, DOC, up to 3 files"
    accept=".pdf,.doc,.docx"
    maxLength={3}
    multiple
    bind:files={documents}
  />
</div>
