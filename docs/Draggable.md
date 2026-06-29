# Draggable

A wrapper that lets the user drag its content to reposition it. Dragging applies a `transform: translate(x, y)` (so it never affects document flow) and updates the bindable `x`/`y`, which makes the position observable and persistable. You can drag by the whole element or restrict to a `handle` selector, constrain to one `axis`, and keep it on screen with `bounds`. The wrapper is also keyboard-movable — focus it and use the arrow keys (by `step`).

Drag changes position only, layered on top of the element's natural/CSS placement — so use it together with whatever positioning the element already has (static, `fixed`, etc.).

## Usage

```svelte
<script>
  import { Draggable } from 'polymorph-ui-components';

  let x = $state(0);
  let y = $state(0);
</script>

<Draggable bind:x bind:y handle=".title-bar">
  <div class="window">
    <div class="title-bar">Drag here</div>
    <div class="content">…</div>
  </div>
</Draggable>
```

## Props

| Prop      | Type                | Required | Default          | Description                                                              |
| --------- | ------------------- | -------- | ---------------- | ------------------------------------------------------------------------ |
| x         | `number`            | No       | `0`              | Bindable. Horizontal translate offset in px.                             |
| y         | `number`            | No       | `0`              | Bindable. Vertical translate offset in px.                               |
| axis      | `'both'\|'x'\|'y'`  | No       | `'both'`         | Constrain movement to one axis.                                          |
| handle    | `string`            | No       | `-`              | CSS selector; only drags starting within a matching element begin. Without it, the whole element drags (skipping native interactive elements). |
| bounds    | `'viewport'\|null`  | No       | `null`           | Keep the element within the viewport.                                    |
| disabled  | `boolean`           | No       | `false`          | Disable dragging and keyboard movement.                                 |
| step      | `number`            | No       | `16`             | Pixels per arrow-key press.                                             |
| dragLabel | `string`            | No       | `'Drag to move'` | Aria-label for the draggable region.                                    |
| children  | `Snippet`           | No       | `-`              | The content to make draggable.                                          |
| testId    | `string`            | No       | `-`              | `data-pw` on the root element.                                          |
| classes   | `string`            | No       | `-`              | Class string on the root element.                                      |

## Events

| Event       | Type                              | Description                          |
| ----------- | --------------------------------- | ------------------------------------ |
| ondragstart | `(pos: { x, y }) => void`         | Fires when a drag begins.            |
| ondrag      | `(pos: { x, y }) => void`         | Fires continuously during a drag.    |
| ondragend   | `(pos: { x, y }) => void`         | Fires when a drag ends.              |

## Keyboard Interactions

Focus the draggable region (focusable when not `disabled`) and move it with the keyboard:

| Key                          | Action                                                   |
| ---------------------------- | ------------------------------------------------------- |
| `Arrow Left` / `Arrow Right` | Move by `step` px horizontally (ignored when `axis="y"`).|
| `Arrow Up` / `Arrow Down`    | Move by `step` px vertically (ignored when `axis="x"`).  |

Arrow keys only move the wrapper when the wrapper itself holds focus, so interactive children keep their own keyboard behavior. Movement is clamped to the viewport when `bounds="viewport"`.

## Accessibility

The draggable region carries `aria-label={dragLabel}` (default `'Drag to move'`) and is keyboard-operable, so dragging is never the only way to reposition. With a `handle` set, only that region begins a drag; without one, drags that start on native interactive elements (buttons, links, inputs, selects, textareas) are ignored so those controls keep working.

## Type Reference

```ts
type DragAxis = 'both' | 'x' | 'y';
type DragPosition = { x: number; y: number };
```

## CSS Variables

| Variable                          | Default             | CSS Property | Description                                  |
| --------------------------------- | ------------------- | ------------ | -------------------------------------------- |
| `--draggable-width`               | `fit-content`       | width        | Width of the wrapper.                        |
| `--draggable-height`              | `fit-content`       | height       | Height of the wrapper.                       |
| `--draggable-cursor`              | `grab`              | cursor       | Cursor at rest (set to `default` when using a `handle`). |
| `--draggable-cursor-active`       | `grabbing`          | cursor       | Cursor while dragging.                       |
| `--draggable-focus-outline`       | `2px solid #3b5bdb` | outline      | Focus ring when keyboard-focused.            |
| `--draggable-focus-outline-offset`| `2px`               | outline-offset | Focus ring offset.                         |

## Web Component

Tag: `<pui-draggable>`

```html
<pui-draggable handle=".title-bar"></pui-draggable>
```
