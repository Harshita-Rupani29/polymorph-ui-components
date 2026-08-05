# Choicebox

A large-target selection card used for prominent single or multi-choice selections. Renders a `children` snippet inside a clickable, keyboard-accessible card. The `selected` prop is bindable and the `onclick` event fires with the new selection state. Supports `radio` and `checkbox` modes, which set the element's ARIA role and selection behavior (in `radio` mode a selected card cannot be deselected by clicking it again).

## Usage

```svelte
<script>
  import { Choicebox } from 'polymorph-ui-components';
</script>

<Choicebox selected={false} mode="radio">
  <span>Standard Delivery</span>
</Choicebox>
```

## Props

| Prop     | Type                    | Required | Default     | Description                                                                                                                                                            |
| -------- | ----------------------- | -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selected | `boolean`               | No       | `false`     | The current selection state of the choicebox. Bindable.                                                                                                                |
| mode     | `'radio' \| 'checkbox'` | No       | `'radio'`   | Sets the element's ARIA role and selection behavior. In `radio` mode a selected card cannot be deselected by clicking it again; `checkbox` mode toggles freely.        |
| disabled | `boolean`               | No       | `false`     | When true, the choicebox is non-interactive and visually dimmed.                                                                                                       |
| showIndicator | `boolean`          | No       | `false`     | Draw the radio dot / checkbox tick inside the card. Off by default so cards that supply their own selected affordance are unaffected.                                   |
| testId   | `string`                | No       | `undefined` | Value for the `data-pw` attribute used in Playwright test selectors.                                                                                                   |
| classes  | `string`                | No       | `-`         | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Snippets

| Snippet  | Type      | Description                                                                                                                      |
| -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| children | `Snippet` | Optional. The content rendered inside the choicebox card. Use this to provide your own layout with title, description, icon etc. |

## Events

| Event   | Type                          | Description                                                                                                                                                           |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onclick | `(selected: boolean) => void` | Fires after the selection state changes. Receives the new boolean selected value (true = selected, false = deselected). Does not fire when the choicebox is disabled. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                            | Default                                | CSS Property  | Description                                                  |
| ----------------------------------- | -------------------------------------- | ------------- | ------------------------------------------------------------ |
| `--choicebox-display`               | `flex`                                 | display       | Display mode of the choicebox container.                     |
| `--choicebox-align-items`           | `center`                               | align-items   | Vertical alignment of the choicebox contents.                |
| `--choicebox-padding`               | `16px`                                 | padding       | Inner padding of the choicebox card.                         |
| `--choicebox-border`                | `2px solid currentColor`               | border        | Border of the choicebox in its default unselected state.     |
| `--choicebox-border-radius`         | `6px`                                 | border-radius | Corner rounding of the choicebox card.                       |
| `--choicebox-background`            | `#ffffff`                              | background    | Background color of the choicebox in its default state.      |
| `--choicebox-gap`                   | `12px`                                 | gap           | Gap between child elements inside the choicebox.             |
| `--choicebox-cursor`                | `pointer`                              | cursor        | Cursor when hovering the choicebox.                          |
| `--choicebox-font-family`           | `inherit`                              | font-family   | Font family of the choicebox.                                |
| `--choicebox-transition`            | `border-color 0.2s, background 0.2s`   | transition    | Transition for state changes (hover, selected).              |
| `--choicebox-focus-ring`            | `0 0 0 3px currentColor`               | box-shadow    | Focus ring shown when the choicebox receives keyboard focus. |
| `--choicebox-hover-border-color`    | `currentColor`                         | border-color  | Border color of the choicebox on hover.                      |
| `--choicebox-hover-background`      | `var(--choicebox-background, #ffffff)` | background    | Background color of the choicebox on hover.                  |
| `--choicebox-selected-border-color` | `currentColor`                         | border-color  | Border color when the choicebox is selected.                 |
| `--choicebox-selected-background`   | `var(--choicebox-background, #ffffff)` | background    | Background color when the choicebox is selected.             |
| `--choicebox-disabled-opacity`      | `0.4`                                  | opacity       | Opacity of the entire choicebox when disabled.               |
| `--choicebox-disabled-cursor`       | `not-allowed`                          | cursor        | Cursor when hovering a disabled choicebox.                   |

## Web Component

Tag: `<pui-choicebox>`

```html
<pui-choicebox mode="radio">
  <span>Option A</span>
</pui-choicebox>
```

### Indicator

Set `showIndicator` to render a selection mark inside the card — a dot in `radio` mode, a tick in
`checkbox` mode. The mark is decorative: the card itself carries `role` and `aria-checked`, so the
indicator is `aria-hidden` and assistive tech reports one control, not two.

The slot content is wrapped in a growing element, so the indicator always sits at the card's
trailing edge whatever the slot contains. The wrapper's alignment and gap fall through to the
card's own values, so theming the card is enough — you only set these to make the inside of the
card differ from the card itself.

| Variable                       | Default                          | Description                                                     |
| ------------------------------ | -------------------------------- | --------------------------------------------------------------- |
| `--choicebox-body-flex`        | `1`                              | Flex of the slot wrapper. `1` makes it fill, pushing the mark out. |
| `--choicebox-body-min-width`   | `0`                              | Allows long slot content to ellipsis rather than overflow.       |
| `--choicebox-body-display`     | `flex`                           | Layout of the slot wrapper.                                      |
| `--choicebox-body-align-items` | `var(--choicebox-align-items)`   | Cross-axis alignment inside the wrapper.                         |
| `--choicebox-body-gap`         | `var(--choicebox-gap)`           | Gap between slot children.                                       |

| Variable                                    | Default              | Description                                          |
| ------------------------------------------- | -------------------- | ---------------------------------------------------- |
| `--choicebox-indicator-size`                | `20px`               | Width and height of the indicator.                   |
| `--choicebox-indicator-border`              | `2px solid #757575`  | Border when unselected.                              |
| `--choicebox-indicator-background`          | `transparent`        | Fill when unselected.                                |
| `--choicebox-indicator-selected-border`     | `2px solid #2196f3`  | Border when selected.                                |
| `--choicebox-indicator-selected-background` | `#2196f3`            | Fill when selected.                                  |
| `--choicebox-indicator-border-radius`       | `var(--radius, 4px)` | Corner rounding in `checkbox` mode.                  |
| `--choicebox-indicator-dot-inset`           | `4px`                | Ring thickness that forms the dot in `radio` mode.   |
| `--choicebox-indicator-dot-color`           | `#ffffff`            | Colour of the ring that punches out the dot. Set this to the card's real background when the choicebox itself is transparent. |
| `--choicebox-indicator-icon-size`           | `14px`               | Size of the tick in `checkbox` mode.                 |
| `--choicebox-indicator-icon-color`          | `#ffffff`            | Colour of the tick.                                  |
| `--choicebox-indicator-transition`          | `background 0.2s, border-color 0.2s` | Transition for selection changes.    |
