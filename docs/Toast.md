# Toast

An animated notification that slides in from a configurable direction, stays visible for `duration` milliseconds, then slides out and fires `ontoasthide`. Ships with a neutral default look (dark surface, light text); restyle it via CSS variables like `--toast-background-color` and `--toast-color`, or define your own variant classes and pass them via `classes`. The toast can overlap the page (absolute positioning) or be inline (relative). Has optional left icon, right icon (acts as close button), subtext, and bottom content snippet.

## Usage

```svelte
<script>
  import { Toast } from 'polymorph-ui-components';
</script>

<Toast />
```

## Props

| Prop                 | Type                                                                                        | Required | Default | Description                                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duration             | `number`                                                                                    | No       | `2000`  | Time in milliseconds the toast stays visible before automatically hiding.                                                                                              |
| leftIcon             | `string \| null`                                                                            | No       | `-`     | URL of an icon displayed on the left side of the toast (e.g., a status icon).                                                                                          |
| message              | `string`                                                                                    | Yes      | `''`    | The main toast notification text.                                                                                                                                      |
| subtext              | `string \| null`                                                                            | No       | `-`     | Optional secondary text displayed below the main message in smaller font.                                                                                              |
| rightIcon            | `string \| null`                                                                            | No       | `-`     | URL of an icon displayed on the right side. Acts as a close button — clicking it hides the toast immediately.                                                          |
| direction            | `ToastDirection = 'left-to-right' \| 'right-to-left' \| 'top-to-bottom' \| 'bottom-to-top'` | No       | `-`     | The direction from which the toast slides in/out. Controls the fly animation axis and direction.                                                                       |
| overlapPage          | `boolean`                                                                                   | No       | `true`  | When true, the toast is absolutely positioned and overlaps page content. When false, it's relatively positioned and pushes content.                                    |
| inAnimationOffset    | `number \| null`                                                                            | No       | `-`     | Pixel offset for the fly-in animation. Higher values mean the toast starts further away.                                                                               |
| inAnimationDuration  | `number \| null`                                                                            | No       | `-`     | Duration in milliseconds for the fly-in animation.                                                                                                                     |
| outAnimationOffset   | `number \| null`                                                                            | No       | `-`     | Pixel offset for the fly-out animation. Higher values mean the toast exits further away.                                                                               |
| outAnimationDuration | `number \| null`                                                                            | No       | `-`     | Duration in milliseconds for the fly-out animation.                                                                                                                    |
| testId               | `string \| null`                                                                            | No       | `-`     | Value for data-pw on the toast container.                                                                                                                              |
| messageTestId        | `string`                                                                                    | No       | `-`     | Value for data-pw on the message element.                                                                                                                              |
| subTextTestId        | `string`                                                                                    | No       | `-`     | Value for data-pw on the subtext element.                                                                                                                              |
| closeIconTestId      | `string`                                                                                    | No       | `-`     | Value for data-pw on the close (right icon) button.                                                                                                                    |
| classes              | `string`                                                                                    | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet       | Type      | Description                                                          |
| ------------- | --------- | -------------------------------------------------------------------- |
| bottomContent | `Snippet` | A Svelte 5 Snippet rendered below the message text inside the toast. |

## Events

| Event       | Type         | Description                                                                                                                   |
| ----------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| ontoasthide | `() => void` | Fires after the toast has fully animated out (outro animation complete). Use this to clean up or remove the toast from state. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                               | Default                                 | CSS Property     | Description                                                             |
| -------------------------------------- | --------------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| `--toast-padding`                      | `10px`                                  | padding          | Padding inside the toast container.                                     |
| `--toast-font-size`                    | `14px`                                  | font-size        | Font size of the toast text.                                            |
| `--toast-font-family`                  | `inherit`                               | font-family      | Font family of the toast text.                                          |
| `--toast-font-weight`                  | `-`                                     | font-weight      | Font weight of the toast text.                                          |
| `--toast-height`                       | `fit-content`                           | height           | Height of the toast container.                                          |
| `--toast-border-radius`                | `8px`                                   | border-radius    | Corner rounding of the toast.                                           |
| `--toast-border`                       | `none`                                  | border           | Border of the toast.                                                    |
| `--toast-border-style`                 | `-`                                     | border-style     |                                                                         |
| `--toast-width`                        | `fit-content`                           | width            | Width of the toast container.                                           |
| `--toast-align-items`                  | `center`                                | align-items      | Vertical alignment of content inside the toast.                         |
| `--toast-margin`                       | `0px 10px 10px 10px`                    | margin           | Outer margin of the toast.                                              |
| `--toast-justify-content`              | `space-between`                         | justify-content  | Horizontal alignment of content inside the toast.                       |
| `--toast-z-index`                      | `1000`                                  | z-index          | Z-index stacking order of the toast.                                    |
| `--toast-display`                      | `flex`                                  | display          | Display mode of the toast.                                              |
| `--toast-position`                     | `absolute`                              | position         | CSS position of the toast (absolute overlaps page, relative is inline). |
| `--toast-top`                          | `10px`                                  | top              | Top position of the toast.                                              |
| `--toast-left`                         | `0`                                     | left             | Left position of the toast.                                             |
| `--toast-right`                        | `0`                                     | right            | Right position of the toast.                                            |
| `--toast-background-color`             | `#18181b`                               | background-color | Background color of the toast.                                          |
| `--toast-color`                        | `#fff`                                  | color            | Text color of the toast.                                               |
| `--toast-box-shadow`                   | `0 4px 12px rgba(0, 0, 0, 0.15)`        | box-shadow       | Drop shadow of the toast.                                              |
| `--toast-opacity`                      | `1`                                     | opacity          | Opacity of the toast.                                                   |
| `--toast-box-sizing`                   | `-`                                     | box-sizing       |                                                                         |
| `--toast-icon-wrapper-width`           | `20px`                                  | width            |                                                                         |
| `--toast-icon-wrapper-height`          | `20px`                                  | height           |                                                                         |
| `--toast-icon-margin`                  | `0px 6px 0px 0px`                       | margin           | Margin around the left icon.                                            |
| `--toast-icon-wrapper-padding`         | `1px`                                   | padding          |                                                                         |
| `--toast-icon-height`                  | `100%`                                  | height           | Height of the toast icons.                                              |
| `--toast-icon-filter`                  | `none`                                  | filter           | CSS filter applied to the toast icons.                                  |
| `--toast-icon-border-radius`           | `50%`                                   | border-radius    | Corner rounding of the toast icons.                                     |
| `--toast-message-display`              | `flex`                                  | display          |                                                                         |
| `--toast-message-flex`                 | `1`                                     | flex             |                                                                         |
| `--toast-message-padding`              | `1px`                                   | padding          |                                                                         |
| `--toast-subtext-color`                | `inherit`                               | color            | Color of the subtext.                                                   |
| `--toast-subtext-font-size`            | `inherit`                                  | font-size        | Font size of the subtext.                                               |
| `--toast-subtext-font-weight`          | `inherit`                                   | font-weight      | Font weight of the subtext.                                             |
| `--toast-subtext-margin`               | `10px 0px 0px 0px`                      | margin           | Margin around the subtext.                                              |
| `--toast-close-button-width`           | `20px`                                  | width            | Width of the close (right icon) button area.                            |
| `--toast-close-button-height`          | `20px`                                  | height           | Height of the close button area.                                        |
| `--toast-close-button-cursor`          | `pointer`                               | cursor           | Cursor of the close button.                                             |
| `--toast-close-button-gap`             | `6px`                                   | gap              |                                                                         |
| `--toast-close-button-margin`          | `0px 0px 0px 10px`                      | margin           | Margin around the close button.                                         |
| `--toast-close-button-display`         | `flex`                                  | display          |                                                                         |
| `--toast-close-button-align-items`     | `center`                                | align-items      |                                                                         |
| `--toast-close-button-justify-content` | `center`                                | justify-content  |                                                                         |
| `--toast-close-button-padding`         | `1px`                                   | padding          |                                                                         |

> **Variants:** there are no built-in `type` presets. Define your own variant classes that set these CSS variables and pass them via `classes`:
>
> ```css
> .toast-success {
>   --toast-background-color: #24aa5a;
>   --toast-color: #fff;
> }
> ```
>
> ```svelte
> <Toast message="Saved!" classes="toast-success" />
> ```

## Type Reference

Custom types used by this component's props and events:

### ToastDirection

```typescript
type ToastDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
```

## Web Component

Tag: `<pui-toast>`

```html
<pui-toast message="Saved!" class="toast-success" duration="3000">
  <a slot="bottom-content" href="/undo">Undo</a>
</pui-toast>
```

### Slots

| Slot Name        | Maps to Snippet | Description                               |
| ---------------- | --------------- | ----------------------------------------- |
| `bottom-content` | `bottomContent` | Content rendered below the toast message. |
