# Design Principles

The philosophy behind **polymorph-ui-components** — what the architecture commits to, and why.

## Core thesis: structure and skin are separate concerns

A component owns **behavior, structure, and accessibility — never appearance**.

Every visual decision is externalized as a CSS custom property with a fallback
(`var(--button-color, #3a4550)`). There are no hardcoded colors or sizes in the
components — only defaults you are meant to override. The styling layer is a
**public API**, designed as deliberately as the props.

The name is the thesis: **polymorph — one form, many shapes**. A single
`<Button>` implementation renders as any design system's button without touching
its source. The library is the skeleton; you bring the skin.

## Principles

### 1. Theming is an API contract, not an afterthought

Visual properties follow a rigid, exhaustive naming convention:
`--{component}-{element}-{property}` (e.g. `--modal-footer-primary-button-border-radius`).
Every CSS variable is documented in each `docs/*.md` alongside its default.
Consumers are expected to theme _everything_, so the theming surface must be
stable and predictable. The cascade is the customization mechanism — define a
theme on an ancestor element and the whole subtree inherits that design system,
no component-level overrides required.

```css
.my-design-system {
  --button-color: #0070f3;
  --button-text-color: #fff;
  --button-border-radius: 6px;
  --button-padding: 10px 20px;
}
```

### 2. Framework-agnosticism is the long game

The library ships **both** a Svelte 5 library and a web-component build
(`<pui-*>` custom elements via `vite.config.wc.ts`). Svelte is the authoring
convenience; the web-component target is the ambition — React, Vue, Angular, and
vanilla teams as addressable consumers. This only works _because_ theming is
CSS-only: the same `--button-color` behaves identically regardless of host
framework. Distribution strategy is downstream of the styling philosophy.

### 3. Predictability through relentless uniformity

Convention is treated as a feature. Every component shares one shape:

- Directory layout: `ComponentName/ComponentName.svelte` + `ComponentName/properties.ts`
- Prop types split into `Mandatory*`, `Optional*`, and `*Event` types, re-exported from `index.ts`
- A universal `classes?: string` escape hatch on every root element
- A universal `testId` → `data-pw={testId}` hook for Playwright
- Lowercase `onclick`-style events that always pass the underlying event object
- Svelte 5 runes throughout: `$props`, `$state`, `$derived`, `$effect`, `$bindable`

Learn one component and you have learned all of them.

### 4. Accessibility is baseline, not premium

ARIA roles, keyboard navigation, focus management, and semantic HTML are present
even in humble components. Accessibility is reasoned about per-state, not bolted
on — e.g. `Pill` only becomes `role="button"` with Enter/Space handling _when_ it
is given an `onclick`; otherwise it stays a plain element.

### 5. Documentation is built for machines, not just humans

The library ships an MCP server (`polymorph-ui-components-mcp`) exposing
`list_components` and `get_component_docs`. A UI library shipping an MCP server
assumes components are increasingly consumed _through AI assistants_. The
structured `docs/*.md` format — props, events, CSS variables, types, web-component
tags — is a queryable knowledge base so an LLM can correctly compose and theme
components. The docs are a protocol, not just prose.

## What qualifies as a component

A component earns its place through **any genuine behavior, state, accessibility
orchestration, or functional value** — not through visual complexity. The bar is
_function_, not size.

**Accepted — even when simple:**

- **Functional primitives, however small.** A component whose purpose includes a
  real function is a component, full stop — e.g. `Snippet` displays code _and_
  copies it, `RelativeTime` formats and self-updates, `Avatar` derives initials
  and falls back when the image errors.
- **Dimensional presets.** `size="small|medium|large"`, `fit-content`, or a
  `variant` that controls layout/dimensions are ergonomic conveniences, not baked
  design. (Only _color / brand / typography_ presets are forbidden — those belong
  in the consumer's CSS.)
- **Borderline / single-behavior components are accepted.** If a component carries
  even one real behavior a stylesheet cannot trivially do — a keyboard handler, a
  state toggle, a derived value, an animation lifecycle — it stays. We do **not**
  demote components for being thin. When in doubt, keep it.

**Still not components** (the genuine non-goals): a purely decorative box with no
behavior, a wrapper that only re-labels a single primitive with a baked layout, or
a "variant" prop that just swaps brand colors. Those are CSS classes or app-level
compositions, not library primitives.

Rule of thumb, deliberately inclusive: **does it do something a stylesheet alone
cannot?** If yes — even barely — it belongs.

## The philosophy in one sentence

> Components should be uncompromising about behavior, accessibility, and
> structure — and completely opinion-free about appearance — so that one
> implementation can become any design system, in any framework, discoverable by
> humans and AI alike.

## The tradeoff we knowingly accept

Nothing looks good out of the box. There is no curated aesthetic and no
batteries-included theme. That is not an omission — it is the point. We would
rather give you a perfect blank canvas with a complete, documented control
surface than a beautiful default you would have to fight. The project optimizes
for **the team building a design system**, not the developer who wants a pretty
button in five minutes.
