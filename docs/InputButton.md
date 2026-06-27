# InputButton

A composite component that combines an Input field with optional left, right, and bottom Button components. The right button is automatically disabled until the input validation state becomes `Valid`, and the bottom button's click handler only fires once validation is `Valid`. Pressing Enter in the input triggers the right button's `onkeyup` handler when validation passes. The input label and error/info messages are rendered outside the input-button group. Internally uses the Input component with `actionInput=true` for seamless visual integration.

## Usage

```svelte
<script>
  import { InputButton } from 'polymorph-ui-components';
</script>

<InputButton />
```

## Props

| Prop                   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required | Default | Description                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value                  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Yes      | `''`    | Bindable. The current input value. Passed through to the internal Input component.                                                                                     |
| inputProperties        | `OptionalInputProperties = { placeholder?: string \| null; dataType?: InputDataType; label?: string \| null; onErrorMessage?: string \| null; infoMessage?: string \| null; validators?: CustomValidator[]; disable?: boolean; validationPattern?: RegExp \| null; inProgressPattern?: RegExp \| null; addFocusColor?: boolean; maxLength?: number; minLength?: number; min?: number; max?: number; actionInput?: boolean; useTextArea?: boolean; autoComplete?: HTMLInputAttributes['autocomplete']; name?: string; textTransformers?: TextTransformer[]; textViewPresentation?: TextTransformer[]; testId?: string; classes?: string; role?: string; ariaExpanded?: boolean; ariaAutocomplete?: 'none' \| 'inline' \| 'list' \| 'both'; ariaControls?: string \| null; ariaActivedescendant?: string \| null }` | Yes      | `-`     | Configuration for the internal Input component. Accepts all optional Input props (placeholder, dataType, label, validators, etc.).                                     |
| rightButtonProperties  | `OptionalButtonProperties \| null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | `-`     | Configuration for the right-side Button. Pass text, icon, loaderType, etc. The button is auto-disabled when input validation is not 'Valid'. Set to null to hide.      |
| leftButtonProperties   | `OptionalButtonProperties \| null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | `-`     | Configuration for the left-side Button. Pass text, icon, etc. Set to null to hide.                                                                                     |
| bottomButtonProperties | `OptionalButtonProperties \| null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | `-`     | Configuration for the bottom Button (rendered below the input row). Its onclick handler only fires when input validation is 'Valid'. Set to null to hide.                           |
| classes                | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |
| testId                 | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | No       | `-`     | Test selector value applied as `data-pw` on the outermost element.                                                                                                    |

## Methods

Exported methods that can be called via `bind:this` on the component instance.

| Method    | Signature    | Description                                                       |
| --------- | ------------ | ----------------------------------------------------------------- |
| `focus()` | `() => void` | Programmatically focuses the underlying input element.            |
| `blur()`  | `() => void` | Programmatically removes focus from the underlying input element. |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet   | Type      | Description                                                     |
| --------- | --------- | --------------------------------------------------------------- |
| leftIcon  | `Snippet` | A Svelte 5 Snippet passed as the icon prop to the left Button.  |
| rightIcon | `Snippet` | A Svelte 5 Snippet passed as the icon prop to the right Button. |

## Events

| Event                       | Type                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputEventProperties        | `InputEventProperties = { oninput?: (value: string, event: Event) => void; onfocus?: (event: FocusEvent) => void; onfocusout?: (event: FocusEvent) => void; onblur?: (event: FocusEvent) => void; onpaste?: (event: ClipboardEvent) => void; onclick?: (event: MouseEvent) => void; onstatechange?: (state: ValidationState) => void; onkeydown?: (event: KeyboardEvent) => void }` | Event handlers passed to the internal Input. The onstatechange callback will receive validation state changes. Note: internally the component intercepts onstatechange to update button enable states before forwarding to your handler. |
| rightButtonEventProperties  | `ButtonEventProperties \| null`                                                                                                                                                                                                                                                                                                               | Event handlers for the right Button. The onclick handler is only called when the input validation state is 'Valid'. The onkeyup is triggered when Enter is pressed in the input with valid state.                                        |
| leftButtonEventProperties   | `ButtonEventProperties \| null`                                                                                                                                                                                                                                                                                                               | Event handlers for the left Button. These are passed directly to the Button component.                                                                                                                                                   |
| bottomButtonEventProperties | `ButtonEventProperties \| null`                                                                                                                                                                                                                                                                                                               | Event handlers for the bottom Button. The onclick handler is only called when the input validation state is 'Valid'.                                                                                                                     |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                | Default                                              | CSS Property                    | Description                                                                 |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------- |
| `--input-button-container-margin`       | `-`                                                  | margin                          | Outer margin of the entire InputButton container.                           |
| `--input-height`                        | `fit-content`                                        | height                          |                                                                             |
| `--input-font-size`                     | `16px`                                               | font-size                       |                                                                             |
| `--input-button-margin`                 | `-`                                                  | margin                          | Margin of the inner input-button row.                                       |
| `--input-button-radius`                 | `6px`                                                | border-radius                   | Corner rounding of the input-button row.                                    |
| `--input-button-container-border`       | `-`                                                  | border                          | Border of the outer container.                                              |
| `--input-button-container-background`   | `-`                                                  | background                      | Background of the outer container.                                          |
| `--input-button-container-padding`      | `-`                                                  | padding                         | Padding inside the outer container.                                         |
| `--input-button-border`                 | `1px solid currentColor`                             | border                          | Border of the inner input-button row (matches the Input border theme).      |
| `--input-button-box-shadow`             | `none`                                               | box-shadow                      | Box shadow of the input-button row.                                         |
| `--input-button-background`             | `-`                                                  | background                      | Background of the input-button row.                                         |
| `--input-button-focus-border`           | `-`                                                  | border                          | Border applied to the container when any child has focus.                   |
| `--input-bottom-btn-padding`            | `10px 0px`                                           | padding                         | Padding around the bottom button.                                           |
| `--input-button-bottom-cursor`                | `-`                                                  | --button-cursor                        | Cursor of the bottom button.                                                |
| `--input-button-bottom-color`                 | `-`                                                  | --button-color                  | Background color of the bottom button.                                      |
| `--input-button-bottom-text-color`            | `-`                                                  | --button-text-color             | Text color of the bottom button.                                            |
| `--input-button-bottom-font-family`           | `-`                                                  | --button-font-family            | Font family of the bottom button.                                           |
| `--input-button-bottom-font-weight`           | `-`                                                  | --button-font-weight            | Font weight of the bottom button.                                           |
| `--input-button-bottom-font-size`             | `-`                                                  | --button-font-size              | Font size of the bottom button.                                             |
| `--input-button-bottom-height`                | `54px`                                               | --button-height                 | Height of the bottom button.                                                |
| `--input-button-bottom-padding`               | `-`                                                  | --button-padding                | Padding inside the bottom button.                                           |
| `--input-button-bottom-border-radius`         | `-`                                                  | --button-border-radius          | Corner rounding of the bottom button.                                       |
| `--input-button-bottom-width`                 | `-`                                                  | --button-width                  | Width of the bottom button.                                                 |
| `--input-label-msg-text-weight`         | `400`                                                | font-weight                     |                                                                             |
| `--input-label-msg-text-size`           | `12px`                                               | font-size                       |                                                                             |
| `--input-label-msg-text-color`          | `currentColor`                                       | color                           |                                                                             |
| `--input-label-msg-text-line-height`    | `-`                                                  | line-height                     |                                                                             |
| `--input-label-msg-text-margin`         | `0px 0px 6px 0px`                                    | margin                          |                                                                             |
| `--invalid-outline`                     | `1px solid var(--input-field-error-stroke, currentColor)` | outline                    | Outline applied to the input-button row when validation state is 'Invalid'. |
| `--input-error-msg-text-weight`         | `400`                                                | font-weight                     |                                                                             |
| `--input-error-msg-text-size`           | `12px`                                               | font-size                       |                                                                             |
| `--input-error-msg-text-color`          | `currentColor`                                       | color                           |                                                                             |
| `--input-btn-error-msg-margin`          | `12px 0px 0px 0px`                                   | margin                          | Margin around the error message.                                            |
| `--input-info-msg-text-weight`          | `400`                                                | font-weight                     |                                                                             |
| `--input-info-msg-text-size`            | `12px`                                               | font-size                       |                                                                             |
| `--input-info-msg-text-color`           | `currentColor`                                       | color                           |                                                                             |
| `--input-btn-info-msg-margin`           | `12px 0px 0px 0px`                                   | margin                          | Margin around the info message.                                             |
| `--input-button-left-color`                   | `-`                                                  | --button-color                  | Background color of the left button.                                        |
| `--input-button-left-text-color`              | `-`                                                  | --button-text-color             | Text color of the left button.                                              |
| `--input-button-left-font-family`             | `-`                                                  | --button-font-family            | Font family of the left button.                                             |
| `--input-button-left-font-weight`             | `-`                                                  | --button-font-weight            | Font weight of the left button.                                             |
| `--input-button-left-font-size`               | `-`                                                  | --button-font-size              | Font size of the left button.                                               |
| `--input-button-left-height`                  | `100%`                                               | --button-height                 | Height of the left button (fills the row to match the input).               |
| `--input-button-left-padding`                 | `0px 16px`                                           | --button-padding                | Padding inside the left button.                                             |
| `--input-button-left-border-radius`           | `-`                                                  | --button-border-radius          | Corner rounding of the left button.                                         |
| `--input-button-left-width`                   | `-`                                                  | --button-width                  | Width of the left button.                                                   |
| `--input-button-left-cursor`                  | `-`                                                  | --button-cursor                        | Cursor of the left button.                                                  |
| `--input-button-left-opacity`                 | `-`                                                  | --button-opacity                       | Opacity of the left button.                                                 |
| `--input-button-left-border`                  | `-`                                                  | --button-border                 | Border of the left button.                                                  |
| `--input-button-left-content-gap`             | `-`                                                  | --button-content-gap            | Gap between icon/text in the left button.                                   |
| `--input-button-left-content-flex-direction`  | `row`                                                | --button-content-flex-direction | Layout direction of the left button content.                                |
| `--input-button-left-icon-order`              | `-`                                                  | --button-icon-order             | Flex order of the icon in the left button.                                  |
| `--input-button-left-icon-display`            | `-`                                                  | --button-icon-display           | Display of the icon in the left button.                                     |
| `--input-button-left-text-order`              | `-`                                                  | --button-text-order             | Flex order of the text in the left button.                                  |
| `--input-button-left-disabled-cursor`         | `-`                                                  | --button-disabled-cursor               | Cursor of the left button when disabled.                                    |
| `--input-button-left-disabled-opacity`        | `-`                                                  | --button-disabled-opacity              | Opacity of the left button when disabled.                                   |
| `--input-button-right-flex`                   | `1`                                                  | flex                            | Flex value of the right button container.                                   |
| `--input-button-right-min-width`              | `0px`                                                | min-width                       | Minimum width of the right button.                                          |
| `--input-button-right-color`                  | `-`                                                  | --button-color                  | Background color of the right button.                                       |
| `--input-button-right-text-color`             | `-`                                                  | --button-text-color             | Text color of the right button.                                             |
| `--input-button-right-font-family`            | `-`                                                  | --button-font-family            | Font family of the right button.                                            |
| `--input-button-right-font-weight`            | `-`                                                  | --button-font-weight            | Font weight of the right button.                                            |
| `--input-button-right-font-size`              | `-`                                                  | --button-font-size              | Font size of the right button.                                              |
| `--input-button-right-height`                 | `100%`                                               | --button-height                 | Height of the right button (fills the row to match the input).              |
| `--input-button-right-padding`                | `0px 16px`                                           | --button-padding                | Padding inside the right button.                                            |
| `--input-button-right-border-radius`          | `0px 6px 6px 0px`                                    | --button-border-radius          | Corner rounding of the right button.                                        |
| `--input-button-right-width`                  | `100%`                                               | --button-width                  | Width of the right button.                                                  |
| `--input-button-right-cursor`                 | `-`                                                  | --button-cursor                        | Cursor of the right button.                                                 |
| `--input-button-right-opacity`                | `-`                                                  | --button-opacity                       | Opacity of the right button.                                                |
| `--input-button-right-border`                 | `-`                                                  | --button-border                 | Border of the right button.                                                 |
| `--input-button-right-content-gap`            | `-`                                                  | --button-content-gap            | Gap between icon/text in the right button.                                  |
| `--input-button-right-visibility`             | `visible`                                            | --button-visibility             | Visibility of the right button.                                             |
| `--input-button-right-content-flex-direction` | `row`                                                | --button-content-flex-direction | Layout direction of the right button content.                               |
| `--input-button-right-icon-order`             | `-`                                                  | --button-icon-order             | Flex order of the icon in the right button.                                 |
| `--input-button-right-icon-display`           | `-`                                                  | --button-icon-display           | Display of the icon in the right button.                                    |
| `--input-button-right-text-order`             | `-`                                                  | --button-text-order             | Flex order of the text in the right button.                                 |
| `--input-button-right-disabled-cursor`        | `-`                                                  | --button-disabled-cursor               | Cursor of the right button when disabled.                                   |
| `--input-button-right-disabled-opacity`       | `-`                                                  | --button-disabled-opacity              | Opacity of the right button when disabled.                                  |

## Type Reference

Custom types used by this component's props and events:

### OptionalInputProperties

```typescript
type OptionalInputProperties = {
  placeholder?: string | null;
  dataType?: InputDataType;
  label?: string | null;
  onErrorMessage?: string | null;
  infoMessage?: string | null;
  validators?: CustomValidator[];
  disable?: boolean;
  validationPattern?: RegExp | null;
  inProgressPattern?: RegExp | null;
  addFocusColor?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  actionInput?: boolean;
  useTextArea?: boolean;
  autoComplete?: HTMLInputAttributes['autocomplete'];
  name?: string;
  textTransformers?: TextTransformer[];
  textViewPresentation?: TextTransformer[];
  testId?: string;
  classes?: string;
  role?: string;
  ariaExpanded?: boolean;
  ariaAutocomplete?: 'none' | 'inline' | 'list' | 'both';
  ariaControls?: string | null;
  ariaActivedescendant?: string | null;
};
```

### OptionalButtonProperties

```typescript
type OptionalButtonProperties = {
  text?: string;
  enable?: boolean;
  showProgressBar?: boolean;
  showLoader?: boolean;
  loaderType?: LoaderType;
  type?: 'submit' | 'reset' | 'button';
  testId?: string;
  icon?: Snippet;
  children?: Snippet;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaSelected?: boolean;
  role?: string;
  disabled?: boolean;
  classes?: string;
};
```

### InputEventProperties

```typescript
type InputEventProperties = {
  oninput?: (value: string, event: Event) => void;
  onfocus?: (event: FocusEvent) => void;
  onfocusout?: (event: FocusEvent) => void;
  onblur?: (event: FocusEvent) => void;
  onpaste?: (event: ClipboardEvent) => void;
  onclick?: (event: MouseEvent) => void;
  onstatechange?: (state: ValidationState) => void;
  onkeydown?: (event: KeyboardEvent) => void;
};
```

### ButtonEventProperties

```typescript
type ButtonEventProperties = {
  onclick?: (event: MouseEvent) => void;
  onkeyup?: (event: KeyboardEvent) => void;
};
```

## Internal Dependencies

This component uses the following library components internally:

- Button
- Input

## Web Component

Tag: `<pui-input-button>`

```html
<pui-input-button value="Search...">
  <svg slot="left-icon">...</svg>
  <svg slot="right-icon">...</svg>
</pui-input-button>
```

### Slots

| Slot Name    | Maps to Snippet | Description                                   |
| ------------ | --------------- | --------------------------------------------- |
| `left-icon`  | `leftIcon`      | Icon rendered on the left side of the input.  |
| `right-icon` | `rightIcon`     | Icon rendered on the right side of the input. |
