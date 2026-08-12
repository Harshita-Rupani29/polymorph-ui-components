# ChatBar

A viewport-positioned container for a chat input that can morph between two placements: **anchored** to an arbitrary element's box, and **docked** to the bottom of the visual viewport. Switching `mode` animates the bar between the two, which is how a landing-page search field can become a chat composer without unmounting or losing focus.

The bar owns positioning only — it renders whatever input you pass as `children`, so it never depends on a particular input component. It docks against `window.visualViewport` rather than the layout viewport, so it rides an on-screen keyboard on mobile instead of being pushed off the bottom of the screen.

Because the bar is `position: fixed` and outside the chat frame, pair it with `showComposer={false}` on `Chat` and reserve space at the bottom of the message list via `--chat-message-list-padding`, so the last message is never hidden behind it.

## Usage

```svelte
<script>
  import { ChatBar, Input } from 'polymorph-ui-components';

  let anchorEl = $state(null);
  let chatOpen = $state(false);
  let value = $state('');
</script>

<div bind:this={anchorEl} class="hero-slot"></div>

<ChatBar mode={chatOpen ? 'docked' : 'anchored'} anchor={anchorEl} active={value.length > 0}>
  <Input bind:value placeholder="Ask anything…" />
</ChatBar>
```

## Props

| Prop          | Type                     | Required | Default    | Description                                                                               |
| ------------- | ------------------------ | -------- | ---------- | ----------------------------------------------------------------------------------------- |
| children      | `Snippet`                | Yes      | `-`        | The input rendered inside the bar.                                                        |
| mode          | `'anchored' \| 'docked'` | No       | `'docked'` | Track `anchor`'s box, or dock to the bottom of the visual viewport.                       |
| anchor        | `HTMLElement \| null`    | No       | `null`     | Element whose box the bar follows in `anchored` mode. Ignored when docked.                |
| maxWidth      | `number`                 | No       | `720`      | Maximum bar width in pixels when docked.                                                  |
| bottomGutter  | `number`                 | No       | `24`       | Gap in pixels between the bar and the bottom of the visual viewport when docked.          |
| sideGutter    | `number`                 | No       | `32`       | Total horizontal breathing room in pixels subtracted from the viewport width when docked. |
| morph         | `boolean`                | No       | `true`     | Animate between placements. Ignored under `prefers-reduced-motion`.                       |
| morphDuration | `number`                 | No       | `750`      | Morph duration in milliseconds. This is the authoritative control — see the note below.   |
| active        | `boolean`                | No       | `false`    | Toggles the ring. Inert until `--chat-bar-ring-opacity` is raised.                        |
| testId        | `string`                 | No       | `-`        | `data-pw` on the root element.                                                            |
| classes       | `string`                 | No       | `-`        | Class string on the root element.                                                         |

## Events

| Event      | Type         | Description                                                                                                              |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| onmorphend | `() => void` | Fires when a mode change finishes settling. Always fires — a timer backs up `transitionend` — so it is safe to await on. |

## CSS Variables

| Variable                        | Default                               | CSS Property  | Description                                                                |
| ------------------------------- | ------------------------------------- | ------------- | -------------------------------------------------------------------------- |
| `--chat-bar-z-index`            | `60`                                  | z-index       | Stacking order of the fixed bar.                                           |
| `--chat-bar-min-height`         | `0`                                   | min-height    | Minimum bar height.                                                        |
| `--chat-bar-padding`            | `0`                                   | padding       | Padding around the input.                                                  |
| `--chat-bar-background`         | `transparent`                         | background    | Bar background.                                                            |
| `--chat-bar-border`             | `none`                                | border        | Bar border.                                                                |
| `--chat-bar-border-radius`      | `0`                                   | border-radius | Bar corner rounding.                                                       |
| `--chat-bar-box-shadow`         | `none`                                | box-shadow    | Bar shadow.                                                                |
| `--chat-bar-filter`             | `none`                                | filter        | Filter hook, e.g. an ambient `drop-shadow` glow.                           |
| `--chat-bar-morph-duration`     | `750ms`                               | transition    | Read-only in practice — written inline from `morphDuration`. Use the prop. |
| `--chat-bar-morph-easing`       | `cubic-bezier(0.6, 0.05, 0.05, 0.95)` | transition    | Morph easing.                                                              |
| `--chat-bar-ring-opacity`       | `0`                                   | opacity       | Ring opacity while `active`. Raise to enable the ring.                     |
| `--chat-bar-ring-background`    | `none`                                | background    | Ring fill. Accepts a gradient.                                             |
| `--chat-bar-ring-width`         | `0px`                                 | padding       | Ring thickness.                                                            |
| `--chat-bar-ring-inset`         | `-1px`                                | inset         | Ring offset from the bar's edge.                                           |
| `--chat-bar-ring-border-radius` | `--chat-bar-border-radius`            | border-radius | Ring corner rounding.                                                      |
| `--chat-bar-ring-transition`    | `0.4s ease`                           | transition    | Ring fade transition.                                                      |

## Notes

- The bar stays hidden until a placement actually succeeds. In `anchored` mode that can be later than mount, because `anchor` may be resolved asynchronously — it is never revealed at an unmeasured position.
- It re-measures on window resize, scroll and `load`, on `visualViewport` resize and scroll, on size changes to itself, the anchor and the document element (`ResizeObserver`), and after `document.fonts.ready`.
- **Position tracking has a limit.** `ResizeObserver` reports size changes, not position changes. An anchor pushed down by late content above it does not itself resize, so the re-measure is usually triggered by the document element growing — "usually" because a shift fully contained in a fixed-size subtree changes neither. If your layout can move the anchor without changing any observed size, call for a re-measure by toggling a prop, or keep the anchor in normal document flow.
- **The bar is `position: fixed` and is not portalled to `document.body`.** It stays where you place it so its children keep DOM identity and focus. The consequence: an ancestor with `transform`, `filter`, `perspective`, `backdrop-filter` or `contain` becomes the containing block for fixed positioning, and the bar will be offset — the script computes visual-viewport coordinates while CSS resolves them against that ancestor. Mount it outside any such ancestor.
- Geometry inputs are clamped rather than validated: a `sideGutter` wider than the viewport, or a negative `maxWidth`, yields a zero-width bar rather than a negative CSS length. Non-finite values are not guarded.
- `morphDuration` is written to `--chat-bar-morph-duration` as an inline style. Inline custom properties beat class-based ones, so setting that variable from a consumer stylesheet has no effect — change the prop instead.
- Under `prefers-reduced-motion`, mode changes apply instantly and `onmorphend` fires immediately.

## Web Component

Tag: `<pui-chat-bar>`

The input goes in the **default slot** — the bar renders nothing of its own, so an empty element shows an empty bar. `anchor`, and the `onmorphend` callback, are objects and must be assigned as properties from JavaScript rather than as attributes.

```html
<pui-chat-bar mode="anchored" max-width="720" bottom-gutter="24">
  <input placeholder="Ask anything…" />
</pui-chat-bar>

<script>
  const bar = document.querySelector('pui-chat-bar');
  bar.anchor = document.querySelector('#hero-slot');
  bar.onmorphend = () => console.log('settled');
</script>
```
