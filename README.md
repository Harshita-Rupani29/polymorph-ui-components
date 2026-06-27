<div align="center">

# polymorph-ui-components

### One set of components. Every design system. Zero overrides.

A **themeable Svelte 5 component library** where _every_ visual property is a CSS custom property.
Unstyled by default — you bring the design system, the components render it.

[![npm](https://img.shields.io/npm/v/polymorph-ui-components?color=ff3e00&label=npm&logo=npm)](https://www.npmjs.com/package/polymorph-ui-components)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-ff3e00?logo=svelte&logoColor=white)](https://svelte.dev)
[![Web Components](https://img.shields.io/badge/Web%20Components-ready-29abe2?logo=webcomponentsdotorg&logoColor=white)](#-use-it-anywhere-web-components)
[![MCP](https://img.shields.io/badge/AI--native-MCP%20server-7c3aed)](#-ai-native-mcp-server)
[![50+ components](https://img.shields.io/badge/components-50%2B-22c55e)](#-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#-license)

```bash
npm install polymorph-ui-components
```

</div>

---

## Why it's different

Most component libraries ship with a **fixed look**. Re-skinning them means fighting `!important`, patching internals through `:global()`, or forking the whole thing.

polymorph takes the opposite stance: **components own behavior, accessibility, and structure — and stay completely opinion-free about appearance.** Every color, space, radius, shadow, and font is a `var(--…)` you control from your own stylesheet. No source changes. No wrapper divs. No fights.

```svelte
<!-- The same Button, themed three different ways — no overrides -->
<div class="brand"><Button text="Continue" /></div>
<div class="danger"><Button text="Delete" /></div>
<div class="ghost"><Button text="Cancel" /></div>

<style>
  .brand {
    --button-color: #6d28d9;
    --button-text-color: #fff;
    --button-border-radius: 8px;
  }
  .danger {
    --button-color: #e11d48;
    --button-text-color: #fff;
  }
  .ghost {
    --button-color: transparent;
    --button-text-color: #111;
    --button-border: 1px solid #ddd;
  }
</style>
```

> 📐 The full reasoning behind this approach lives in **[DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md)**.

---

## ✨ Highlights

|                                  |                                                                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 **Theme with CSS variables**  | Every visual decision is a `var(--component-element-property)`. Define a theme once on an ancestor; the whole subtree inherits it.  |
| 🧩 **50+ behavioral primitives** | Modals, sheets, menus, comboboxes, calendars, tables, toasts, steppers — focus traps, roving tabindex, and state machines included. |
| 🌍 **Framework-agnostic**        | Ships as a Svelte library **and** as native Web Components (`<pui-*>`). Use it in React, Vue, Angular, or plain HTML.               |
| 🤖 **AI-native**                 | A bundled **MCP server** exposes every component's props, events, and CSS variables to your AI coding assistant.                    |
| ♿ **Accessible by default**     | ARIA wiring, keyboard navigation, focus management, and semantic HTML are baseline — not a premium add-on.                          |
| ⚡ **Built on Svelte 5**         | `$props`, `$state`, `$derived`, `$bindable`, and `Snippet` throughout. Fully typed, tree-shakeable.                                 |

---

## 🚀 Quick Start

```svelte
<script lang="ts">
  import { Button, Input, Toggle } from 'polymorph-ui-components';

  let dark = $state(false);
</script>

<Button text="Submit" onclick={() => console.log('clicked')} />

<Input
  value=""
  placeholder="Enter email"
  dataType="email"
  onstatechange={(state) => console.log(state)}
/>

<Toggle checked={dark} text="Dark mode" onclick={(on) => (dark = on)} />
```

---

## 🎨 Theming in 30 seconds

Every component reads its visuals from CSS variables with sensible neutral defaults. Define them on **any ancestor** and you have a theme:

```svelte
<div class="my-design-system">
  <Button text="Save" onclick={save} />
  <Input value="" placeholder="Search…" />
</div>

<style>
  .my-design-system {
    --button-color: #0070f3;
    --button-text-color: #fff;
    --button-border-radius: 6px;
    --button-padding: 10px 20px;

    --input-background: #fafafa;
    --input-border: 1px solid #eaeaea;
    --input-radius: 6px;
    --input-focus-border: 1px solid #0070f3;

    --modal-border-radius: 12px;
    --modal-overlay-background-color: #00000066;
  }
</style>
```

**Variants are your CSS classes, not our props.** Need a `danger` button? Write `.btn-danger { --button-color: #e11d48 }` and pass `classes="btn-danger"`. Because variables cascade, you can even **scope different themes** to different parts of the same page.

The naming convention is predictable everywhere:

```
--{component}-{element}-{property}
```

`--button-color` · `--input-error-msg-text-color` · `--modal-footer-primary-button-border-radius`

Each component documents its **complete** variable surface in [`docs/`](docs/).

---

## 🌍 Use it anywhere (Web Components)

The same components compile to **framework-agnostic custom elements** — theming works identically because it's pure CSS.

```html
<script type="module" src="polymorph-ui-components/wc"></script>

<pui-button text="Save"></pui-button>
<pui-input placeholder="Search…"></pui-input>

<style>
  pui-button {
    --button-color: #0070f3;
    --button-text-color: #fff;
  }
</style>
```

Drop them into React, Vue, Angular, Astro, or a plain `.html` file — no build step required.

---

## 🤖 AI-native (MCP server)

A companion **Model Context Protocol** server ships as a separate package so your AI assistant can _query the component catalogue directly_ — props, events, types, and every CSS variable.

```bash
npm install polymorph-ui-components-mcp
```

```jsonc
// .mcp.json (or any MCP client config)
{
  "mcpServers": {
    "polymorph-ui": {
      "command": "npx",
      "args": ["-y", "polymorph-ui-components-mcp"]
    }
  }
}
```

Now you can ask: _"Using the polymorph-ui MCP, theme the Select to match my brand and map my custom option rendering onto its snippets."_ — and the assistant has the real API in context.

---

## 🧩 Components

<details open>
<summary><b>Inputs &amp; Form Controls</b></summary>

| Component       | Description                                                                                                          |                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Button**      | Action trigger with circular loader, progress bar, icon/children snippets, and `aria-expanded`.                      | [docs](docs/Button.md)      |
| **Input**       | Text field with built-in validation (email, phone, password, custom patterns), text transformers, and textarea mode. | [docs](docs/Input.md)       |
| **InputButton** | Input fused with action buttons — search bars, OTP entry, coupon codes.                                              | [docs](docs/InputButton.md) |
| **Select**      | Dropdown with searchable single-select and multi-select (dismissible pills) plus custom content slots.               | [docs](docs/Select.md)      |
| **Combobox**    | Autocomplete input with filtered listbox, `aria-activedescendant`, and keyboard navigation.                          | [docs](docs/Combobox.md)    |
| **Toggle**      | Labeled on/off switch with sliding animation.                                                                        | [docs](docs/Toggle.md)      |
| **Checkbox**    | Tri-state checkbox with custom SVG checkmark and `aria-checked=mixed`.                                               | [docs](docs/Checkbox.md)    |
| **Radio**       | Grouped radio with custom indicator over a native input.                                                             | [docs](docs/Radio.md)       |
| **Slider**      | Range slider with min/max/step and derived fill.                                                                     | [docs](docs/Slider.md)      |
| **Choicebox**   | Selectable option box with radio/checkbox semantics and custom content.                                              | [docs](docs/Choicebox.md)   |
| **SplitInput**  | Segmented input (OTP / PIN) with paste distribution and auto-advance.                                                | [docs](docs/SplitInput.md)  |
| **ColorPicker** | HSV color picker with pointer-drag saturation panel and hue slider.                                                  | [docs](docs/ColorPicker.md) |
| **Calendar**    | Date / range picker with roving-tabindex grid and `Intl` formatting.                                                 | [docs](docs/Calendar.md)    |

</details>

<details>
<summary><b>Overlays &amp; Panels</b></summary>

| Component                                 | Description                                                                                           |                                |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Modal**                                 | Dialog overlay with size/alignment, header, footer, transitions, scroll-lock, and back-press support. | [docs](docs/Modal.md)          |
| **Sheet**                                 | Slide-in panel from any edge with header, scrollable body, footer, and focus trap.                    | [docs](docs/Sheet.md)          |
| **Menu**                                  | Dropdown action menu with keyboard navigation, typeahead, disabled/danger items, and separators.      | [docs](docs/Menu.md)           |
| **ContextMenu**                           | Right-click menu with separators, disabled/danger items, and keyboard navigation.                     | [docs](docs/ContextMenu.md)    |
| **CommandMenu**                           | Command palette (Ctrl/Cmd+K) with search, grouped commands, and keyboard navigation.                  | [docs](docs/CommandMenu.md)    |
| **Tooltip**                               | Hover/focus tooltip with configurable position and delay.                                             | [docs](docs/Tooltip.md)        |
| **ModalAnimation** / **OverlayAnimation** | Fly/fade transition wrappers.                                                                         | [docs](docs/ModalAnimation.md) |

</details>

<details>
<summary><b>Display &amp; Data</b></summary>

| Component                          | Description                                                             |                               |
| ---------------------------------- | ----------------------------------------------------------------------- | ----------------------------- |
| **Table**                          | Sortable data table with sticky headers and per-cell scrolling.         | [docs](docs/Table.md)         |
| **ListItem**                       | Multi-section list row with images, labels, and accordion expansion.    | [docs](docs/ListItem.md)      |
| **Avatar**                         | Circular avatar with image fallback or derived initials.                | [docs](docs/Avatar.md)        |
| **Badge**                          | Icon with a numeric/text badge overlay.                                 | [docs](docs/Badge.md)         |
| **Pill**                           | Compact label/tag, optionally clickable with a11y.                      | [docs](docs/Pill.md)          |
| **Icon** / **IconStack** / **Img** | Clickable icon, overlapping icon stack, image with load-error fallback. | [docs](docs/Icon.md)          |
| **GridItem**                       | Grid cell with icon, label, and loading overlay.                        | [docs](docs/GridItem.md)      |
| **RelativeTime**                   | Auto-updating "5 minutes ago" with locale support.                      | [docs](docs/RelativeTime.md)  |
| **KeyboardInput**                  | Keyboard-shortcut display with styled key caps.                         | [docs](docs/KeyboardInput.md) |

</details>

<details>
<summary><b>Navigation &amp; Structure</b></summary>

| Component              | Description                                                          |                               |
| ---------------------- | -------------------------------------------------------------------- | ----------------------------- |
| **Tabs**               | Tabbed interface with animated indicator and overflow scrolling.     | [docs](docs/Tabs.md)          |
| **Pagination**         | Windowed page navigation with ellipsis truncation.                   | [docs](docs/Pagination.md)    |
| **Stepper** / **Step** | Multi-step progress indicator with completed/active/pending states.  | [docs](docs/Stepper.md)       |
| **Accordion**          | Collapsible container with CSS grid animation.                       | [docs](docs/Accordion.md)     |
| **Carousel**           | Swipeable content slider with autoplay and pagination dots.          | [docs](docs/Carousel.md)      |
| **Scroller**           | Overflowing list with arrow nav, gradient edges, and drag-to-scroll. | [docs](docs/Scroller.md)      |
| **CheckListItem**      | Checklist row with checkbox, label, and checked state.               | [docs](docs/CheckListItem.md) |
| **Toolbar**            | Header bar with back button, title, and customizable content areas.  | [docs](docs/Toolbar.md)       |
| **ThemeSwitcher**      | Segmented light/dark/system control with `prefers-color-scheme`.     | [docs](docs/ThemeSwitcher.md) |

</details>

<details>
<summary><b>Feedback &amp; Loading</b></summary>

| Component                                  | Description                                                             |                          |
| ------------------------------------------ | ----------------------------------------------------------------------- | ------------------------ |
| **Toast**                                  | Animated slide-in notification with auto-dismiss and per-direction fly. | [docs](docs/Toast.md)    |
| **Banner**                                 | Notification banner with icon snippet, link text, and dismiss.          | [docs](docs/Banner.md)   |
| **Progress**                               | Animated horizontal progress bar (determinate / indeterminate).         | [docs](docs/Progress.md) |
| **Gauge**                                  | Full-circle ring gauge (0–100) with animated SVG arc.                   | [docs](docs/Gauge.md)    |
| **Loader** / **LoadingDots** / **Shimmer** | Spinner, animated dots, and skeleton shimmer — all CSS-variable themed. | [docs](docs/Loader.md)   |

</details>

<details>
<summary><b>Actions, Code &amp; Scenery</b></summary>

| Component                          | Description                                                                                |                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------- |
| **SplitButton**                    | Primary action button with a dropdown of secondary actions.                                | [docs](docs/SplitButton.md) |
| **Snippet**                        | Code/command block with a copy button.                                                     | [docs](docs/Snippet.md)     |
| **Book** / **Browser** / **Phone** | Decorative frames — flip-book, browser chrome, device mockup — for previews and marketing. | [docs](docs/Browser.md)     |

</details>

---

## ♿ Accessibility & Svelte 5

Interactive components own their accessibility: focus traps (`Modal`, `Sheet`), roving tabindex (`Calendar`, `Menu`, `Tabs`), `aria-activedescendant` wiring (`Combobox`, `Select`), live regions (`Toast`), and internal Enter/Space handling on every custom control.

Under the hood it's modern Svelte 5 — `$props()`, `$state()`/`$derived()`, `$bindable()` two-way props, and `Snippet` content slots:

```svelte
<script lang="ts">
  import { Sheet } from 'polymorph-ui-components';
  let open = $state(false);
</script>

<button onclick={() => (open = true)}>Open</button>

<Sheet bind:open title="Settings" side="right">
  {#snippet content()}
    <p>Sheet body goes here.</p>
  {/snippet}
  {#snippet footer()}
    <button onclick={() => (open = false)}>Done</button>
  {/snippet}
</Sheet>
```

Every component exports its types:

```typescript
import type {
  ButtonProperties,
  InputProperties,
  ModalProperties,
  SelectProperties,
  MenuItem
} from 'polymorph-ui-components';
```

---

## 🛠 Development

```bash
pnpm install   # install dependencies
pnpm dev       # dev server with hot reload (component playground)
pnpm build     # build library (vite + svelte-package + publint)
pnpm test      # integration + unit tests
pnpm lint      # formatting + lint
```

```
src/lib/{Component}/{Component}.svelte   # implementation
src/lib/{Component}/properties.ts        # typed props
src/lib/index.ts                         # public exports
src/wc/                                  # Web Component wrappers
docs/                                    # one markdown reference per component
mcp/                                     # MCP server package
```

Releases are automated: pushing to `release` lints, derives the semver bump from the conventional-commit message, bumps the version, generates a changelog, builds, tags a GitHub release, and publishes to npm.

---

## 🙏 Credits

**polymorph-ui-components** is built on top of [`@juspay/svelte-ui-components`](https://github.com/juspay/svelte-ui-components) — it began as that library and carries forward its CSS-variable-driven theming foundation. It no longer depends on or pulls from the upstream package; instead it **builds on that groundwork and evolves independently**. Thanks to the original authors for the foundation. 🙌

---

## 📄 License

[MIT](LICENSE) — peer dependencies: `svelte ^5.41.2`.

<div align="center">
<sub>Build any design system. In any framework. Discoverable by humans and AI alike.</sub>
</div>
