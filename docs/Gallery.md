# Gallery

An image gallery with grid and list views and a built-in lightbox viewer. Clicking an item (or pressing Enter/Space on it) opens the image full-screen in a modal lightbox with previous/next navigation, keyboard support (Escape closes, ArrowLeft/ArrowRight navigate, Home/End jump to first/last), a focus trap, a fade transition, and focus return to the originating item on close. Body scroll is locked for exactly as long as the lightbox is rendered. The lightbox state is also exposed as bindable `open` / `activeIndex` props, so consumers can observe it or open the lightbox programmatically. The `view` prop switches between a `grid` of image tiles and a `list` of rows showing the thumbnail, the `alt` text as title, and the `caption` as subtitle. When an `oneditclick` and/or `ondeleteclick` handler is provided, each item renders the corresponding edit/delete action buttons (grid: overlaid top-right; list: at the row end) that fire the handler without opening the lightbox. Items only become buttons when the lightbox is enabled or an `onimageclick` handler is provided; otherwise they render as plain content. Reuses the `Img` component for error-based fallback rendering, the `Button` component for lightbox and edit controls, and the `Icon` component for the built-in control icons.

## Usage

```svelte
<script>
  import { Gallery } from 'polymorph-ui-components';

  const images = [
    { src: '/photos/1.jpg', alt: 'Mountain lake at dawn', caption: 'Lake Louise' },
    { src: '/photos/2.jpg', alt: 'Forest trail', thumbnail: '/photos/2-thumb.jpg' },
    { src: '/photos/3.jpg', alt: 'City skyline at night' }
  ];
</script>

<Gallery {images} />

<!-- List view with edit and delete buttons -->
<Gallery
  {images}
  view="list"
  oneditclick={(index) => openEditor(index)}
  ondeleteclick={(index) => removeImage(index)}
/>

<!-- Programmatic lightbox control via bindable props -->
<Gallery {images} bind:open={lightboxOpen} bind:activeIndex={lightboxIndex} />
<Button text="Show third image" onclick={() => { lightboxIndex = 2; lightboxOpen = true; }} />
```

## Props

| Prop           | Type             | Required | Default | Description                                                                                                                                                                                                                |
| -------------- | ---------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| images         | `GalleryImage[]` | Yes      | `-`     | Array of images to display. Each entry has a full-size `src`, required `alt` text, and optional `thumbnail` (shown in the grid/list), `fallback` (shown when the image fails to load), and `caption` (shown in the lightbox and as the list-row subtitle). |
| view           | `GalleryView`    | No       | `grid`  | Layout of the gallery items: `grid` renders image tiles; `list` renders rows with the thumbnail, `alt` text as title, and `caption` as subtitle.                                                                           |
| open           | `boolean`        | No       | `false` | Whether the lightbox is open. Bindable — the component sets it to `false` when the lightbox is closed, and consumers can set it to `true` (with `activeIndex`) to open the lightbox programmatically.                       |
| activeIndex    | `number`         | No       | `0`     | Index of the image shown in the lightbox. Bindable — updated by lightbox navigation; set it together with `open` for programmatic control.                                                                                 |
| enableLightbox | `boolean`        | No       | `true`  | When true, clicking an item opens the image in the lightbox. When false, items are non-interactive unless `onimageclick` is provided.                                                                                      |
| loop           | `boolean`        | No       | `false` | When true, lightbox navigation wraps around from the last image to the first and vice versa.                                                                                                                               |
| showCounter    | `boolean`        | No       | `true`  | When true, shows a "current / total" position counter at the bottom of the lightbox.                                                                                                                                       |
| showCaption    | `boolean`        | No       | `true`  | When true, shows the active image's `caption` below it in the lightbox (only when the image has one).                                                                                                                      |
| previousIcon   | `Snippet`        | No       | `-`     | Snippet rendering a custom previous-navigation icon. Falls back to the built-in chevron asset when omitted.                                                                                                                |
| nextIcon       | `Snippet`        | No       | `-`     | Snippet rendering a custom next-navigation icon. Falls back to the built-in chevron asset when omitted.                                                                                                                    |
| closeIcon      | `Snippet`        | No       | `-`     | Snippet rendering a custom close icon. Falls back to the built-in close asset when omitted.                                                                                                                                |
| editIcon       | `Snippet`        | No       | `-`     | Snippet rendering a custom edit icon. Falls back to the built-in pencil asset when omitted. Only rendered when `oneditclick` is provided.                                                                                  |
| deleteIcon     | `Snippet`        | No       | `-`     | Snippet rendering a custom delete icon. Falls back to the built-in trash asset when omitted. Only rendered when `ondeleteclick` is provided.                                                                               |
| testId         | `string`         | No       | `-`     | Test selector value applied as `data-pw` on the grid container.                                                                                                                                                            |
| classes        | `string`         | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides (e.g., `.btn-primary { --button-color: #0070f3; }`) and pass them to create variant styles. |

## Events

| Event        | Type                                    | Description                                                                                 |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------- |
| onimageclick | `(index: number, event: MouseEvent) => void` | Fires when a gallery item is clicked, before the lightbox opens.                       |
| oneditclick  | `(index: number, event: MouseEvent) => void` | Fires when an item's edit button is clicked. Providing this handler is what makes the edit buttons render; the click does not open the lightbox. |
| ondeleteclick | `(index: number, event: MouseEvent) => void` | Fires when an item's delete button is clicked. Providing this handler is what makes the delete buttons render; the click does not open the lightbox. |
| onopen       | `(index: number) => void`               | Fires when the lightbox opens, with the index of the opened image.                          |
| onclose      | `() => void`                            | Fires when the component closes the lightbox (close button, Escape key, or backdrop click). Not fired when the consumer closes it by writing `open = false`. |
| onchange     | `(index: number) => void`               | Fires when the active lightbox image changes via navigation buttons or keyboard.            |
| onkeydown    | `(event: KeyboardEvent) => void`        | Fires for key presses while the lightbox is open, before the built-in keyboard handling.    |

## Keyboard Interactions

| Key                   | Context        | Action                                  |
| --------------------- | -------------- | ---------------------------------------- |
| `Enter` / `Space`     | Gallery item   | Opens the lightbox for that image.       |
| `Enter` / `Space`     | Edit button    | Fires `oneditclick` for that image.      |
| `Enter` / `Space`     | Delete button  | Fires `ondeleteclick` for that image.    |
| `Escape`              | Lightbox open  | Closes the lightbox.                     |
| `ArrowLeft`           | Lightbox open  | Shows the previous image.                |
| `ArrowRight`          | Lightbox open  | Shows the next image.                    |
| `Home` / `End`        | Lightbox open  | Jumps to the first / last image.         |
| `Tab` / `Shift+Tab`   | Lightbox open  | Cycles focus between lightbox controls (focus is trapped). |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                     | Default        | CSS Property          | Description                                                                    |
| -------------------------------------------- | -------------- | --------------------- | ------------------------------------------------------------------------------ |
| `--gallery-columns`                          | `3`            | grid-template-columns | Number of columns in the grid (used as `repeat(N, 1fr)`).                      |
| `--gallery-gap`                              | `8px`          | gap                   | Gap between grid tiles.                                                        |
| `--gallery-width`                            | `100%`         | width                 | Width of the grid container.                                                   |
| `--gallery-padding`                          | `0px`          | padding               | Padding of the grid container.                                                 |
| `--gallery-margin`                           | `0px`          | margin                | Margin of the grid container.                                                  |
| `--gallery-background`                       | `transparent`  | background            | Background of the grid container.                                              |
| `--gallery-item-aspect-ratio`                | `1`            | aspect-ratio          | Aspect ratio of each grid tile.                                                |
| `--gallery-item-border-radius`               | `0px`          | border-radius         | Corner rounding of each grid tile and its image.                               |
| `--gallery-item-border`                      | `none`         | border                | Border of each interactive item (grid tile or list row open-button).           |
| `--gallery-item-image-fit`                   | `cover`        | object-fit            | Object fit of the image inside each grid tile.                                 |
| `--gallery-item-image-transition`            | `-`            | transition            | Transition applied to the image inside each grid tile.                         |
| `--gallery-item-cursor`                      | `pointer`      | cursor                | Cursor over interactive items (grid tiles or list rows).                       |
| `--gallery-item-transition`                  | `-`            | transition            | Transition applied to interactive items (grid tiles or list rows).             |
| `--gallery-item-hover-opacity`               | `1`            | opacity               | Opacity of an interactive grid tile on hover.                                  |
| `--gallery-item-hover-transform`             | `-`            | transform             | Transform of an interactive grid tile on hover.                                |
| `--gallery-item-focus-outline`               | `2px solid currentColor` | outline     | Focus-visible outline of an interactive item. Wraps the grid tile, or the full list row including its action buttons. |
| `--gallery-item-focus-outline-offset`        | `2px`          | outline-offset        | Focus-visible outline offset of an interactive item.                           |
| `--gallery-list-item-gap`                    | `12px`         | gap                   | Gap between the thumbnail and text block in a list row.                        |
| `--gallery-list-item-padding`                | `8px`          | padding               | Padding of each list row.                                                      |
| `--gallery-list-item-background`             | `transparent`  | background            | Background of each list row.                                                   |
| `--gallery-list-item-hover-background`       | `transparent`  | background            | Hover background of an interactive list row. Covers the full row, action buttons included; static rows are not highlighted. |
| `--gallery-list-item-border-radius`          | `0px`          | border-radius         | Corner rounding of each list row.                                              |
| `--gallery-list-thumbnail-width`             | `56px`         | width                 | Width of the thumbnail in a list row.                                          |
| `--gallery-list-thumbnail-height`            | `56px`         | height                | Height of the thumbnail in a list row.                                         |
| `--gallery-list-thumbnail-fit`               | `cover`        | object-fit            | Object fit of the thumbnail in a list row.                                     |
| `--gallery-list-thumbnail-border-radius`     | `0px`          | border-radius         | Corner rounding of the thumbnail in a list row.                                |
| `--gallery-list-text-gap`                    | `2px`          | gap                   | Gap between the title and caption in a list row.                               |
| `--gallery-list-title-color`                 | `inherit`      | color                 | Text color of the list-row title (the image `alt`).                            |
| `--gallery-list-title-font-size`             | `14px`         | font-size             | Font size of the list-row title.                                               |
| `--gallery-list-title-font-weight`           | `500`          | font-weight           | Font weight of the list-row title.                                             |
| `--gallery-list-title-font-family`           | `-`            | font-family           | Font family of the list-row title.                                             |
| `--gallery-list-caption-color`               | `inherit`      | color                 | Text color of the list-row caption.                                            |
| `--gallery-list-caption-font-size`           | `12px`         | font-size             | Font size of the list-row caption.                                             |
| `--gallery-list-caption-font-family`         | `-`            | font-family           | Font family of the list-row caption.                                           |
| `--gallery-item-actions-top`                 | `8px`          | top                   | Distance of the action-button cluster from the top of a grid tile.             |
| `--gallery-item-actions-right`               | `8px`          | right / padding-right | Distance of the action-button cluster from the right edge of an item.          |
| `--gallery-item-actions-gap`                 | `4px`          | gap                   | Gap between the edit and delete buttons.                                       |
| `--gallery-item-action-background`           | grid: `#00000066`, list: `transparent` | background       | Background of the edit/delete action buttons. Grid tiles get a frosted-glass scrim over the image; list rows stay transparent. |
| `--gallery-item-action-backdrop-filter`      | grid: `blur(8px)` | backdrop-filter    | Backdrop filter behind the action buttons in grid view (frosted-glass effect). |
| `--gallery-item-action-color`                | grid: `#ffffff`, list: `currentColor`  | color            | Icon color of the action buttons.                                              |
| `--gallery-item-action-hover-background`     | grid: `#00000099`, list: `#80808026`   | background       | Hover background of the action buttons.                                        |
| `--gallery-item-action-padding`              | `6px`          | padding               | Padding of the action buttons.                                                 |
| `--gallery-item-action-border-radius`        | `8px`          | border-radius         | Corner rounding of the action buttons.                                         |
| `--gallery-item-action-icon-size`            | `16px`         | width / height        | Size of the built-in icons inside the action buttons (bridged to the inner `Icon`'s `--icon-width`/`--icon-height`; custom icon snippets size themselves). |
| `--gallery-lightbox-z-index`                 | `15`           | z-index               | Stacking order of the lightbox overlay.                                        |
| `--gallery-lightbox-background`              | `#000000e6`    | background            | Backdrop color of the lightbox overlay.                                        |
| `--gallery-lightbox-image-width`             | `85vw`         | width                 | Width of the lightbox image box (image letterboxes inside via object-fit).     |
| `--gallery-lightbox-image-height`            | `75vh`         | height                | Height of the lightbox image box.                                              |
| `--gallery-lightbox-image-fit`               | `contain`      | object-fit            | Object fit of the lightbox image.                                              |
| `--gallery-lightbox-image-border-radius`     | `0px`          | border-radius         | Corner rounding of the lightbox image.                                         |
| `--gallery-lightbox-caption-gap`             | `12px`         | gap                   | Gap between the lightbox image and its caption.                                |
| `--gallery-lightbox-caption-color`           | `#ffffff`      | color                 | Text color of the lightbox caption.                                            |
| `--gallery-lightbox-caption-font-size`       | `14px`         | font-size             | Font size of the lightbox caption.                                             |
| `--gallery-lightbox-caption-font-family`     | `-`            | font-family           | Font family of the lightbox caption.                                           |
| `--gallery-lightbox-counter-bottom`          | `16px`         | bottom                | Distance of the position counter from the bottom of the lightbox.              |
| `--gallery-lightbox-counter-color`           | `#ffffff`      | color                 | Text color of the position counter.                                            |
| `--gallery-lightbox-counter-font-size`       | `13px`         | font-size             | Font size of the position counter.                                             |
| `--gallery-lightbox-counter-font-family`     | `-`            | font-family           | Font family of the position counter.                                           |
| `--gallery-lightbox-close-top`               | `16px`         | top                   | Distance of the close button from the top of the lightbox.                     |
| `--gallery-lightbox-close-right`             | `16px`         | right                 | Distance of the close button from the right of the lightbox.                   |
| `--gallery-lightbox-nav-inset`               | `16px`         | left / right          | Distance of the previous/next buttons from the lightbox edges.                 |
| `--gallery-lightbox-control-background`      | `transparent`  | background-color      | Background of the lightbox close and navigation buttons.                       |
| `--gallery-lightbox-control-color`           | `#ffffff`      | color                 | Icon color of the lightbox close and navigation buttons.                       |
| `--gallery-lightbox-control-hover-background`| `#ffffff1f`    | background            | Hover background of the lightbox close and navigation buttons.                 |
| `--gallery-lightbox-control-padding`         | `8px`          | padding               | Padding of the lightbox close and navigation buttons.                          |
| `--gallery-lightbox-control-border-radius`   | `50%`          | border-radius         | Corner rounding of the lightbox close and navigation buttons.                  |
| `--gallery-lightbox-control-icon-size`       | `24px`         | width / height        | Size of the built-in icons inside the lightbox close and navigation buttons (bridged to the inner `Icon`'s `--icon-width`/`--icon-height`; custom icon snippets size themselves). |

## Type Reference

Custom types used by this component's props and events:

### GalleryImage

```typescript
type GalleryImage = {
  src: string;
  alt: string;
  thumbnail?: string;
  fallback?: string;
  caption?: string;
};
```

### GalleryView

```typescript
type GalleryView = 'grid' | 'list';
```

## Web Component

Tag: `<pui-gallery>`

```html
<pui-gallery view="list" loop show-counter active-index="2"></pui-gallery>
```

> **Note:** The `images` prop is an array — set it via JavaScript property, as are the `onimageclick`/`oneditclick`/`ondeleteclick` handlers. Icon snippet props (`previousIcon`, `nextIcon`, `closeIcon`, `editIcon`, `deleteIcon`) are not attribute-serializable; custom-element consumers fall back to the built-in icon assets.
