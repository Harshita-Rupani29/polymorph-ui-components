<script lang="ts">
  import Gallery from '$lib/Gallery/Gallery.svelte';
  import Button from '$lib/Button/Button.svelte';
  import type { GalleryImage } from '$lib/Gallery/properties';

  let lastEdited = $state('none yet');
  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);

  const images: GalleryImage[] = [
    {
      src: 'https://picsum.photos/900/600?random=90',
      alt: 'Sample landscape',
      caption: 'A wide landscape'
    },
    {
      src: 'https://picsum.photos/600/900?random=91',
      alt: 'Sample portrait',
      caption: 'A tall portrait'
    },
    { src: 'https://picsum.photos/800/800?random=92', alt: 'Sample square' },
    {
      src: 'https://picsum.photos/900/500?random=93',
      alt: 'Sample panorama',
      caption: 'A short panorama'
    },
    { src: 'https://picsum.photos/700/700?random=94', alt: 'Sample texture' },
    {
      src: 'https://picsum.photos/850/650?random=95',
      alt: 'Sample scenery',
      caption: 'Some scenery'
    }
  ];

  let listImages = $state<GalleryImage[]>([...images]);
  let gridImages = $state<GalleryImage[]>([...images]);
</script>

<div class="page-header">
  <span class="category-badge">Media</span>
  <h1>Gallery</h1>
</div>

<h2>Default — click a tile to open the lightbox</h2>
<div class="demo-gallery">
  <Gallery {images} loop bind:open={lightboxOpen} bind:activeIndex={lightboxIndex} />
  <div class="programmatic-open">
    <Button
      text="Open lightbox at 3rd image"
      onclick={() => {
        lightboxIndex = 2;
        lightboxOpen = true;
      }}
    />
  </div>
</div>

<h2>Rounded tiles, 4 columns, hover zoom, edit/delete actions</h2>
<div class="demo-gallery themed">
  <Gallery
    images={gridImages}
    oneditclick={(index) => {
      lastEdited = gridImages.at(index)?.alt ?? String(index);
    }}
    ondeleteclick={(index) => {
      gridImages = gridImages.filter((_, i) => i !== index);
    }}
  />
</div>

<h2>Static grid — no lightbox, plain images</h2>
<div class="demo-gallery">
  <Gallery images={images.slice(0, 3)} enableLightbox={false} />
</div>

<h2>List view with edit and delete buttons</h2>
<p class="edit-status">Last edit clicked: {lastEdited}</p>
<div class="demo-gallery list-demo">
  <Gallery
    images={listImages}
    view="list"
    oneditclick={(index) => {
      lastEdited = listImages.at(index)?.alt ?? String(index);
    }}
    ondeleteclick={(index) => {
      listImages = listImages.filter((_, i) => i !== index);
    }}
  />
</div>

<style>
  .demo-gallery {
    max-width: 640px;
    --gallery-lightbox-z-index: 30;
  }

  .themed {
    --gallery-columns: 4;
    --gallery-gap: 12px;
    --gallery-item-border-radius: 12px;
    --gallery-item-image-transition: transform 0.3s ease;
    --gallery-item-hover-opacity: 0.9;
    --gallery-lightbox-background: #101318f2;
    --gallery-lightbox-image-border-radius: 8px;
  }

  .themed :global(.gallery-item-content:hover img) {
    transform: scale(1.05);
  }

  .list-demo {
    --gallery-gap: 4px;
    --gallery-list-item-border-radius: 8px;
    --gallery-list-item-hover-background: var(--doc-demo-bg, #f4f6fb);
    --gallery-list-thumbnail-border-radius: 6px;
    --gallery-list-caption-color: var(--doc-text-muted, #636d80);
  }

  .edit-status {
    font-size: 13px;
    color: var(--doc-text-secondary, #495568);
  }

  .programmatic-open {
    margin-top: 12px;
    --button-padding: 8px 14px;
    --button-font-size: 13px;
  }
</style>
