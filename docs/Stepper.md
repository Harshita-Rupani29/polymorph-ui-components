# Stepper

A progress indicator showing numbered steps with completion and active states. Each step shows either a step number or a custom icon, a label, and a dashed separator line to the next step. Steps before `currentStepIndex` are styled as completed, the step at `currentStepIndex` is active (both inherit the current text color by default), and remaining steps are inactive (grey). Each step is clickable, firing `onhandlestepclick` with the selected index.

## Usage

```svelte
<script>
  import { Stepper } from 'polymorph-ui-components';
</script>

<Stepper />
```

## Props

| Prop             | Type            | Required | Default | Description                                                                                                                                                            |
| ---------------- | --------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| steps            | `Array<Step>`   | Yes      | `-`     | Array of Step objects defining each step. Each Step has a `label` string and optional `icon` URL.                                                                      |
| currentStepIndex | `number`        | Yes      | `-`     | The 0-based index of the currently active step. Steps before this index are styled as completed, the step at this index is active.                                     |
| classes          | `string`        | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |
| testId           | `string`        | No       | `-`     | Test selector value applied as `data-pw` on the outermost element.                                                                                                    |

## Events

| Event             | Type                                         | Description                                                                                     |
| ----------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| onhandlestepclick | `(event: { selectedIndex: number }) => void` | Fires when any step is clicked. Receives { selectedIndex: number } with the 1-based step index. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                            | Default   | CSS Property                       | Description                                                              |
| --------------------------------------------------- | --------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `--stepper-flex-direction`                        | `row`     | flex-direction                     | Layout direction of the steps (row for horizontal, column for vertical). |
| `--step-text-active-color`                          | `currentColor` | --step-text-color                  | Text color of the active step label.                                     |
| `--step-separator-background-image-active-color`         | `currentColor` | --step-separator-background-image-color | Color of the separator line for active steps.                            |
| `--step-text-completed-color`                       | `currentColor` | --step-text-color                  | Text color of completed step labels.                                     |
| `--step-separator-background-image-completed-color`      | `currentColor` | --step-separator-background-image-color | Color of the separator line for completed steps.                         |
| `--step-index-container-active-background-color`    | `currentColor` | background-color                   | Background color of the active step circle.                              |
| `--step-index-container-completed-background-color` | `currentColor` | background-color                   | Background color of completed step circles.                              |

### Step Sub-component CSS Variables

These CSS variables are defined in the `Step` sub-component and control individual step styling.

| Variable                                  | Default             | CSS Property     | Description                                  |
| ----------------------------------------- | ------------------- | ---------------- | -------------------------------------------- |
| `--step-flex-direction`                   | `row`               | flex-direction   | Layout direction of each step.               |
| `--step-index-container-height`           | `30px`              | height           | Height of the step number circle.            |
| `--step-index-container-width`            | `30px`              | width            | Width of the step number circle.             |
| `--step-index-container-radius`           | `50%`               | border-radius    | Border radius of the step number circle.     |
| `--step-index-container-background-color` | `currentColor`      | background-color | Background color of inactive step circles.   |
| `--step-index-font-size`                  | `14px`              | font-size        | Font size of the step number.                |
| `--step-index-color`                      | `white`             | color            | Text color of the step number.               |
| `--step-separator-display`                     | `block`             | display          | Display mode of the step separator.          |
| `--step-separator-height`                      | `1px`               | height           | Height of the separator line.                |
| `--step-separator-width`                       | `50px`              | width            | Width of the separator line.                 |
| `--step-separator-margin`                      | `0px 12px 0px 12px` | margin           | Margin around the separator.                 |
| `--step-separator-background-image`            | `repeating-linear-gradient(...)` | background-image | Background image pattern for the step separator line. |
| `--step-separator-background-image-color`      | `currentColor`      | (gradient color) | Color used in the dashed separator gradient. |
| `--step-text-margin`                      | `0px 0px 0px 12px`  | margin           | Margin around the step label text.           |
| `--step-text-font-size`                   | `inherit`           | font-size        | Font size of the step label.                 |
| `--step-text-color`                       | `inherit`           | color            | Color of the step label text.                |

## Type Reference

Custom types used by this component's props and events:

### Step

```typescript
type Step = { label: string; icon?: string };
```

## Web Component

Tag: `<pui-stepper>`

```html
<pui-stepper current-step-index="1"></pui-stepper>
```

> **Note:** The `steps` prop is an array — set it via JavaScript property.
