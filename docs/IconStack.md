# IconStack

A horizontal stack of circular icons/avatars with negative margin layering (each icon overlaps the previous one). Each item can be either an `image` (renders an `<img>`) or `text` (renders a text span). Icons are z-indexed so the first icon appears on top. Commonly used for showing multiple user avatars or bank icons in a compact space.

## Usage

```svelte
<script>
  import { IconStack } from 'polymorph-ui-components';
</script>

<IconStack />
```

## Props

| Prop    | Type              | Required | Default | Description                                                                                                                                                            |
| ------- | ----------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| icons   | `IconStackItem[]` | Yes      | `-`     | Array of IconStackItem objects. Each item has a `type` ('image' or 'text') and a `content` string (URL for images, display text for text items).                       |
| testId  | `string`          | No       | `-`     | Test selector value applied as `data-pw` on the outermost element.                                                                                                     |
| classes | `string`          | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                           | Default               | CSS Property    | Description                                             |
| ---------------------------------- | --------------------- | --------------- | ------------------------------------------------------- |
| `--icon-stack-container-margin`         | `0px`                 | margin          | Margin of the icon stack container.                     |
| `--icon-stack-icon-width`               | `36px`                | width           | Width of each icon circle.                              |
| `--icon-stack-icon-height`              | `36px`                | height          | Height of each icon circle.                             |
| `--icon-stack-icon-bg`                  | `white`               | background      | Background color of each icon circle.                   |
| `--icon-stack-icon-radius`              | `50%`                 | border-radius   | Corner rounding of each icon (50% for circle).          |
| `--icon-stack-icon-margin`              | `0px 0px 0px -14px`   | margin          | Margin of each icon (negative left for overlap effect). |
| `--icon-stack-icon-align-items`         | `center`              | align-items     | Vertical alignment of content inside each icon.         |
| `--icon-stack-icon-border`              | `1px solid currentColor` | border          | Border of each icon circle.                             |
| `--icon-stack-icon-justify-content`     | `center`              | justify-content | Horizontal alignment of content inside each icon.       |
| `--icon-stack-icon-shadow`              | `0 2px 4px #00000026` | box-shadow      | Box shadow of each icon circle.                         |
| `--icon-stack-img-width`                | `36px`                | width           | Width of the image inside each icon.                    |
| `--icon-stack-img-height`               | `36px`                | height          | Height of the image inside each icon.                   |
| `--icon-stack-text-container-width`           | `36px`                | width           | Width of text-type icon containers.                     |
| `--icon-stack-text-container-height`          | `36px`                | height          | Height of text-type icon containers.                    |
| `--icon-stack-text-container-align-items`     | `center`              | align-items     | Vertical alignment inside text-type icons.              |
| `--icon-stack-text-container-justify-content` | `center`              | justify-content | Horizontal alignment inside text-type icons.            |
| `--icon-stack-text-color`                     | `inherit`                | color           | Text color inside text-type icons.                      |
| `--icon-stack-text-size`                      | `inherit`             | font-size       | Font size inside text-type icons.                       |
| `--icon-stack-text-weight`                    | `inherit`             | font-weight     | Font weight inside text-type icons.                     |
| `--icon-stack-text-align`                     | `center`              | text-align      | Text alignment inside text-type icons.                  |

## Type Reference

Custom types used by this component's props and events:

### IconStackItem

```typescript
type IconStackItem = { type: 'image' | 'text'; content: string };
```

## Web Component

Tag: `<pui-icon-stack>`

```html
<pui-icon-stack></pui-icon-stack>
```

> **Note:** The `icons` prop is an array — set it via JavaScript property.
