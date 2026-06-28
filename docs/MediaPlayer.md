# MediaPlayer

An image or video player with a hover-revealed control overlay. For `type="image"` it renders the source through the `Img` component (with optional `fallback`). For `type="video"` it renders the video plus a centered play/pause control and a bottom-aligned mute/unmute control that appear on hover; the controls reuse the `Button` component. Built-in icons (imported from assets) are used for the controls and can be replaced with snippet props. The `playing` and `muted` states are bindable. Set `controls` to fall back to the browser's native video controls (the custom overlay is then hidden). Unstyled by default — every dimension, the overlay color, and the control appearance are driven by CSS variables.

## Usage

```svelte
<script>
  import { MediaPlayer } from 'polymorph-ui-components';
</script>

<MediaPlayer type="image" src="/photo.jpg" alt="A photo" />

<MediaPlayer type="video" src="/clip.mp4" />

<!-- Swap a control icon with your own markup -->
<MediaPlayer type="video" src="/clip.mp4">
  {#snippet playIcon()}
    <img src="/icons/play.svg" alt="" />
  {/snippet}
</MediaPlayer>
```

## Props

| Prop       | Type                  | Required | Default | Description                                                                                              |
| ---------- | --------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------- |
| src        | `string`              | Yes      | `-`     | URL of the image or video to display.                                                                    |
| type       | `'image' \| 'video'`  | Yes      | `-`     | Whether the source is rendered as an image or a video with controls.                                     |
| alt        | `string`              | No       | `''`    | Alternative text for the image (ignored for video).                                                      |
| fallback   | `string`              | No       | `-`     | Fallback image URL used (via the `Img` component) if `src` fails to load. Image type only.               |
| autoplay   | `boolean`             | No       | `true`  | Whether the video begins playing automatically (video only).                                             |
| loop       | `boolean`             | No       | `false` | Whether the video restarts when it ends (video only).                                                    |
| controls   | `boolean`             | No       | `false` | When true, uses the browser's native video controls and hides the custom overlay (video only).           |
| playing    | `boolean`             | No       | `true`  | Bindable. Reflects whether the video is currently playing. Updates the centered control icon.            |
| muted      | `boolean`             | No       | `true`  | Bindable. Reflects whether the video audio is muted. Updates the mute control icon.                      |
| playIcon   | `Snippet`             | No       | `-`     | Snippet rendering a custom play-control icon. Falls back to the built-in asset when omitted.             |
| pauseIcon  | `Snippet`             | No       | `-`     | Snippet rendering a custom pause-control icon. Falls back to the built-in asset when omitted.            |
| muteIcon   | `Snippet`             | No       | `-`     | Snippet rendering a custom muted-control icon. Falls back to the built-in asset when omitted.            |
| unmuteIcon | `Snippet`             | No       | `-`     | Snippet rendering a custom unmuted-control icon. Falls back to the built-in asset when omitted.          |
| testId     | `string`              | No       | `-`     | Test selector value applied as `data-pw` on the outermost element.                                       |
| classes    | `string`              | No       | `-`     | CSS class string applied to the top-level element. Useful for theming via CSS variable override classes. |

## Events

| Event          | Type                       | Description                                                          |
| -------------- | -------------------------- | ------------------------------------------------------------------- |
| onplay         | `(event: Event) => void`   | Fires when video playback starts. `playing` is set to true first.   |
| onpause        | `(event: Event) => void`   | Fires when video playback pauses. `playing` is set to false first.  |
| onvolumechange | `(muted: boolean) => void` | Fires when the mute control is toggled, with the new muted state.   |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                       | Default                       | CSS Property     | Description                                              |
| ---------------------------------------------- | ----------------------------- | ---------------- | ------------------------------------------------------- |
| `--media-player-height`                        | `400px`                       | height           | Height of the player container.                         |
| `--media-player-width`                         | `fit-content`                 | width            | Width of the player container.                          |
| `--media-player-border-radius`                 | `14px`                        | border-radius    | Corner rounding of the player container.                |
| `--media-player-overflow`                      | `hidden`                      | overflow         | Overflow behavior of the container.                     |
| `--media-player-background`                    | `transparent`                 | background       | Background behind the media.                            |
| `--media-player-media-height`                  | `100%`                        | height           | Height of the image/video element.                      |
| `--media-player-media-width`                   | `fit-content`                 | width            | Width of the image/video element.                       |
| `--media-player-media-object-fit`              | `contain`                     | object-fit       | Object-fit of the media element.                        |
| `--media-player-media-border-radius`           | `inherit`                     | border-radius    | Corner rounding of the media element.                   |
| `--media-player-media-cursor`                  | `pointer`                     | cursor           | Cursor over the video element.                          |
| `--media-player-overlay-z-index`               | `20`                          | z-index          | Stacking order of the control overlay.                  |
| `--media-player-overlay-color`                 | `transparent`                 | background-color | Overlay background color at rest.                       |
| `--media-player-overlay-hover-color`           | `#0000004d`                   | background-color | Overlay background color on hover.                      |
| `--media-player-overlay-transition`            | `background-color 0.2s ease`  | transition       | Transition applied to the overlay.                      |
| `--media-player-center-controls-visibility`    | `hidden`                      | visibility       | Resting visibility of the centered control.             |
| `--media-player-bottom-controls-visibility`    | `hidden`                      | visibility       | Resting visibility of the bottom control.               |
| `--media-player-bottom-controls-justify`       | `flex-end`                    | justify-content  | Horizontal alignment of the bottom control.             |
| `--media-player-bottom-controls-padding`       | `12px`                        | padding          | Padding around the bottom control row.                  |
| `--media-player-control-padding`               | `0px`                         | padding          | Inner padding of each control button.                   |
| `--media-player-control-border`                | `none`                        | border           | Border of each control button.                          |
| `--media-player-control-border-radius`         | `50%`                         | border-radius    | Corner rounding of each control button.                 |
| `--media-player-control-background-color`      | `transparent`                 | background-color | Background color of each control button.                |
| `--media-player-control-color`                 | `#ffffff`                     | color            | Icon color of each control button.                      |
| `--media-player-control-hover-background-color`| `var(--media-player-control-background-color)` | background-color | Control background color on hover.     |
| `--media-player-control-hover-color`           | `var(--media-player-control-color)` | color      | Control icon color on hover.                            |
| `--media-player-center-control-size`           | `64px`                        | height/width     | Size of the centered play/pause control.                |
| `--media-player-bottom-control-size`           | `24px`                        | height/width     | Size of the bottom mute control.                        |
| `--media-player-control-icon-size`             | `100%`                        | height/width     | Size of the icon inside each control (relative to the control). |

## Web Component

Tag: `<pui-media-player>`

```html
<pui-media-player type="video" src="/clip.mp4"></pui-media-player>
```
