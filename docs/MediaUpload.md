# MediaUpload

A polished file upload field with a drag-and-drop drop zone, inline previews, and validation. Image files render as cover thumbnails (via the `Img` component) with a `Shimmer` placeholder while they load; non-image files render as a card with a file icon, name, and size. Files are validated against `accept` and `maxFileSize` and capped at `maxLength`; rejected files surface an inline, customizable error message. A header row shows the optional label and an `attached / maxLength` counter, and each card reveals a remove button (the `Button` component) on hover. The bindable `files` array plus `onchange`, `onremove`, and `onerror` callbacks expose the current selection. All text is opt-in (no baked-in copy), built-in icons can be swapped via snippet props, and every dimension, color, border, and interaction state is themeable through CSS variables.

## Usage

```svelte
<script>
  import { MediaUpload } from 'polymorph-ui-components';

  let files = $state([]);
</script>

<MediaUpload
  bind:files
  label="Supporting Images"
  hintText="PNG or JPG, up to 5 MB"
  accept="image/*"
  maxFileSize={5 * 1024 * 1024}
  maxLength={4}
  multiple
/>

<!-- Swap an icon with your own markup -->
<MediaUpload bind:files accept=".pdf,.doc,.docx">
  {#snippet fileIcon()}
    <img src="/icons/document.svg" alt="" />
  {/snippet}
</MediaUpload>
```

## Props

| Prop          | Type                      | Required | Default                          | Description                                                                                              |
| ------------- | ------------------------- | -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| label         | `string`                  | No       | `-`                              | Heading text shown above the previews. Hidden when omitted.                                              |
| description   | `string`                  | No       | `-`                              | Helper text under the label. Hidden when omitted.                                                        |
| addText       | `string`                  | No       | `-`                              | Caption inside the drop tile. Hidden when omitted (the tile still shows its icon).                       |
| hintText      | `string`                  | No       | `-`                              | Secondary hint inside the drop tile (e.g. accepted formats and size limit). Hidden when omitted.         |
| maxLength     | `number`                  | No       | `3`                              | Maximum number of files. The drop tile hides once reached.                                               |
| accept        | `string`                  | No       | `'image/*'`                      | Accepted file types. Forwarded to the file input and used to validate dropped files (MIME or extension). |
| maxFileSize   | `number`                  | No       | `0`                              | Maximum size per file in bytes. `0` disables the size check.                                              |
| multiple      | `boolean`                 | No       | `false`                          | Allow selecting/dropping more than one file at a time (still capped by `maxLength`).                      |
| dragAndDrop   | `boolean`                 | No       | `true`                           | Enable the drag-and-drop drop zone.                                                                       |
| disabled      | `boolean`                 | No       | `false`                          | Disable all interaction and dim the component.                                                           |
| showCounter   | `boolean`                 | No       | `true`                           | Show the `attached / maxLength` counter next to the label.                                               |
| showFileName  | `boolean`                 | No       | `true`                           | Show each file's name on its card.                                                                        |
| showFileSize  | `boolean`                 | No       | `true`                           | Show each file's human-readable size on its card.                                                         |
| addIcon       | `Snippet`                 | No       | `-`                              | Snippet rendering a custom drop-tile icon. Falls back to the built-in asset when omitted.                 |
| removeIcon    | `Snippet`                 | No       | `-`                              | Snippet rendering a custom remove-button icon. Falls back to the built-in asset when omitted.             |
| fileIcon      | `Snippet`                 | No       | `-`                              | Snippet rendering a custom icon for non-image files. Falls back to the built-in asset when omitted.       |
| errorMessages | `MediaUploadErrorMessages`| No       | `-`                              | Override copy for the `type`, `size`, and `max` validation messages.                                     |
| files         | `File[]`                  | No       | `[]`                             | Bindable. The list of currently attached files.                                                          |
| testId        | `string`                  | No       | `-`                              | Test selector value applied as `data-pw` on the outermost element.                                       |
| classes       | `string`                  | No       | `-`                              | CSS class string applied to the top-level element. Useful for theming via CSS variable override classes. |

## Events

| Event    | Type                                        | Description                                                              |
| -------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| onchange | `(files: File[]) => void`                   | Fires after a file is added or removed, with the updated files array.   |
| onremove | `(file: File) => void`                      | Fires when a single file is removed, with the removed file.             |
| onerror  | `(rejections: MediaUploadRejection[]) => void` | Fires when files are rejected, each with a `'type' \| 'size' \| 'max'` reason. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                       | Default                                              | CSS Property     | Description                                  |
| ---------------------------------------------- | ---------------------------------------------------- | ---------------- | -------------------------------------------- |
| `--media-upload-width`                         | `fit-content`                                        | width            | Width of the component.                      |
| `--media-upload-font-family`                   | `inherit`                                            | font-family      | Font family of all text.                     |
| `--media-upload-color`                         | `inherit`                                            | color            | Base text color.                             |
| `--media-upload-disabled-opacity`              | `0.55`                                               | opacity          | Opacity when `disabled`.                     |
| `--media-upload-header-gap`                    | `12px`                                               | gap              | Gap between label and counter.               |
| `--media-upload-label-margin`                  | `0 0 4px 0`                                          | margin           | Margin around the header row.                |
| `--media-upload-label-font-size`               | `14px`                                               | font-size        | Font size of the label.                      |
| `--media-upload-label-font-weight`             | `600`                                                | font-weight      | Weight of the label.                         |
| `--media-upload-label-color`                   | `#242833`                                            | color            | Color of the label.                          |
| `--media-upload-counter-font-size`             | `12px`                                               | font-size        | Font size of the counter.                    |
| `--media-upload-counter-font-weight`           | `500`                                                | font-weight      | Weight of the counter.                       |
| `--media-upload-counter-color`                 | `#8a8f98`                                            | color            | Color of the counter.                        |
| `--media-upload-description-font-size`         | `12px`                                               | font-size        | Font size of the helper description.         |
| `--media-upload-description-color`             | `#656565`                                            | color            | Color of the helper description.             |
| `--media-upload-description-margin`            | `0`                                                  | margin           | Margin around the helper description.        |
| `--media-upload-gap`                           | `12px`                                               | gap              | Gap between cards and the drop tile.         |
| `--media-upload-content-margin`                | `12px 0 0 0`                                         | margin           | Margin above the grid.                       |
| `--media-upload-item-height`                   | `110px`                                              | height           | Height of each card/drop tile.               |
| `--media-upload-item-width`                    | `110px`                                              | width            | Width of each card/drop tile.                |
| `--media-upload-item-border-radius`            | `14px`                                               | border-radius    | Corner rounding of cards/drop tile.          |
| `--media-upload-item-border`                   | `1px solid #e4e4e7`                                  | border           | Border of each preview card.                 |
| `--media-upload-item-background-color`         | `#fafafa`                                            | background-color | Background of each preview card.             |
| `--media-upload-item-box-shadow`               | `0 1px 2px rgba(0,0,0,0.06)`                         | box-shadow       | Resting shadow of each card.                 |
| `--media-upload-item-transition`               | `box-shadow 0.2s ease, transform 0.2s ease`         | transition       | Card hover transition.                       |
| `--media-upload-item-hover-box-shadow`         | `0 6px 18px rgba(0,0,0,0.14)`                        | box-shadow       | Card shadow on hover.                        |
| `--media-upload-item-hover-transform`          | `translateY(-2px)`                                   | transform        | Card transform on hover.                     |
| `--media-upload-item-object-fit`               | `cover`                                              | object-fit       | Object-fit of image thumbnails.              |

The loading placeholder is the `Shimmer` component sized to fill the card; theme it with the standard `--shimmer-*` variables (`--shimmer-background`, `--shimmer-highlight`, `--shimmer-duration`).
| `--media-upload-file-icon-color`               | `#8a8f98`                                            | color            | Color of the non-image file icon.            |
| `--media-upload-file-icon-size`                | `36px`                                               | height/width     | Size of the non-image file icon.             |
| `--media-upload-meta-padding`                  | `6px 8px`                                            | padding          | Padding of the name/size overlay.            |
| `--media-upload-meta-background`               | `linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0))` | background | Gradient behind the overlay on image cards.  |
| `--media-upload-meta-color`                    | `#ffffff`                                            | color            | Text color of the overlay on image cards.    |
| `--media-upload-file-meta-background`          | `transparent`                                        | background       | Overlay background on file cards.            |
| `--media-upload-file-meta-color`               | `#52525b`                                            | color            | Overlay text color on file cards.            |
| `--media-upload-meta-name-font-size`           | `11px`                                               | font-size        | Font size of the file name.                  |
| `--media-upload-meta-name-font-weight`         | `500`                                                | font-weight      | Weight of the file name.                     |
| `--media-upload-meta-size-font-size`           | `10px`                                               | font-size        | Font size of the file size.                  |
| `--media-upload-meta-size-opacity`             | `0.85`                                               | opacity          | Opacity of the file size text.               |
| `--media-upload-remove-inset`                  | `6px`                                                | top/right        | Inset of the remove button from the corner.  |
| `--media-upload-remove-padding`                | `4px`                                                | padding          | Inner padding of the remove button.          |
| `--media-upload-remove-size`                   | `24px`                                               | height/width     | Size of the remove button.                   |
| `--media-upload-remove-icon-size`              | `100%`                                               | height/width     | Size of the icon inside the remove button.   |
| `--media-upload-remove-border`                 | `none`                                               | border           | Border of the remove button.                 |
| `--media-upload-remove-border-radius`          | `50%`                                                | border-radius    | Corner rounding of the remove button.        |
| `--media-upload-remove-background-color`       | `rgba(0,0,0,0.55)`                                   | background-color | Background of the remove button.             |
| `--media-upload-remove-color`                  | `#ffffff`                                            | color            | Icon color of the remove button.             |
| `--media-upload-remove-opacity`                | `0`                                                  | opacity          | Resting opacity (revealed on card hover).    |
| `--media-upload-remove-transition`             | `opacity 0.18s ease, background-color 0.18s ease`   | transition       | Remove button transition.                    |
| `--media-upload-remove-hover-background-color` | `rgba(0,0,0,0.78)`                                   | background-color | Remove button background on hover.           |
| `--media-upload-remove-hover-color`            | `var(--media-upload-remove-color)`                   | color            | Remove button icon color on hover.           |
| `--media-upload-add-gap`                       | `6px`                                                | gap              | Gap between drop-tile icon/text rows.        |
| `--media-upload-add-padding`                   | `12px`                                               | padding          | Inner padding of the drop tile.              |
| `--media-upload-add-background-color`          | `#fafafa`                                            | background-color | Background of the drop tile.                 |
| `--media-upload-add-border`                    | `1.5px dashed #c8ccd2`                               | border           | Border of the drop tile.                     |
| `--media-upload-add-color`                     | `#6b7280`                                            | color            | Text/icon color of the drop tile.            |
| `--media-upload-add-transition`                | `border-color/background/color 0.18s ease`          | transition       | Drop tile transition.                        |
| `--media-upload-add-hover-background-color`    | `#f1f5ff`                                            | background-color | Drop tile background on hover.               |
| `--media-upload-add-hover-border`              | `1.5px dashed #6d8eff`                               | border           | Drop tile border on hover.                   |
| `--media-upload-add-hover-color`               | `#3b5bdb`                                            | color            | Drop tile color on hover.                    |
| `--media-upload-add-dragging-background-color` | `#e7efff`                                            | background-color | Drop tile background while dragging over.    |
| `--media-upload-add-dragging-border`           | `1.5px solid #3b5bdb`                                | border           | Drop tile border while dragging over.        |
| `--media-upload-add-dragging-color`            | `#3b5bdb`                                            | color            | Drop tile color while dragging over.         |
| `--media-upload-add-icon-size`                 | `22px`                                               | height/width     | Size of the drop-tile icon.                  |
| `--media-upload-add-text-font-size`            | `11px`                                               | font-size        | Font size of the drop-tile caption.          |
| `--media-upload-add-text-line-height`          | `1.3`                                                | line-height      | Line height of the drop-tile caption.        |
| `--media-upload-add-hint-font-size`            | `10px`                                               | font-size        | Font size of the drop-tile hint.             |
| `--media-upload-add-hint-color`                | `#9aa0a8`                                            | color            | Color of the drop-tile hint.                 |
| `--media-upload-error-font-size`               | `12px`                                               | font-size        | Font size of the inline error.               |
| `--media-upload-error-color`                   | `#e0334b`                                            | color            | Color of the inline error.                   |
| `--media-upload-error-margin`                  | `8px 0 0 0`                                          | margin           | Margin above the inline error.               |

## Web Component

Tag: `<pui-media-upload>`

```html
<pui-media-upload label="Attachments" accept=".pdf,.doc,.docx" max-length="3" multiple></pui-media-upload>
```
