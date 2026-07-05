# Component Roadmap

> Building a comprehensive, themeable UI component library — authored natively in Svelte 5 and shipped as standard Web Components, so they run anywhere: React, Vue, Angular, or plain HTML.

---

## Inputs & Form Controls

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 1 | Button | :white_check_mark: | Trigger actions like form submissions or dialogs |
| 2 | Input | :white_check_mark: | Single-line text input with validation |
| 3 | Textarea | :white_check_mark: | Multi-line text input (via `Input` with `useTextArea`) |
| 4 | Select | :white_check_mark: | Dropdown list for picking a single option |
| 5 | Toggle | :white_check_mark: | Boolean on/off switch |
| 6 | Checkbox | :white_check_mark: | Check/uncheck control for boolean or multi-select choices |
| 7 | Radio | :white_check_mark: | Single selection from a group of options |
| 8 | Choicebox | :white_check_mark: | Large-target radio/checkbox with extended tap area and detail text |
| 9 | Combobox | :white_check_mark: | Filterable dropdown with typeahead search |
| 10 | Multi Select | :white_check_mark: | Keyboard-navigable selection of multiple items (via `Select` with `multiple`) |
| 11 | Slider | :white_check_mark: | Range input for selecting a value within a min/max range |
| 12 | Split Button | :white_check_mark: | Primary action button with a dropdown for secondary actions |
| 13 | Color Picker | :white_check_mark: | Color input with swatch preview and optional value display |
| 14 | Split Input | :white_check_mark: | Segmented single-character input for codes and OTP entry |
| 15 | Feedback | :x: | Inline feedback collector with text input and emotion selector |

---

## Display & Data

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 16 | Badge | :white_check_mark: | Label to highlight status or categorize items |
| 17 | Status | :x: | Colored dot indicator for deployment or process status |
| 18 | Table | :white_check_mark: | Semantic HTML table with sortable columns and row actions |
| 19 | Avatar | :white_check_mark: | User or team image with fallback initials and stacking support |
| 20 | Code Block | :x: | Syntax-highlighted, copyable code display |
| 21 | Description | :x: | Heading + subheading block for contextual information |
| 22 | Entity | :x: | Two-column row with content on the left and actions on the right |
| 23 | Gauge | :white_check_mark: | Circular visual indicator for percentages |
| 24 | Pill | :white_check_mark: | Small rounded label for categorization or filtering |
| 25 | Snippet | :white_check_mark: | Copyable command-line code snippet |
| 26 | Keyboard Input | :white_check_mark: | Renders keyboard shortcut badges (e.g. `Ctrl+K`) |
| 27 | Relative Time Card | :white_check_mark: | Popover showing a date in the user's local timezone |
| 57 | Gallery | :white_check_mark: | Image gallery with grid/list views, lightbox viewer, keyboard navigation, focus management, and optional per-item edit/delete actions |

---

## Feedback & Loading

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 28 | Banner | :white_check_mark: | Informational notice requiring user attention |
| 29 | Loader | :white_check_mark: | Spinner animation for background activity |
| 30 | Toast | :white_check_mark: | Temporary message notification |
| 31 | Error | :x: | Structured error message with clear guidance |
| 32 | Loading Dots | :white_check_mark: | Animated dot sequence for inline loading indication |
| 33 | Progress | :white_check_mark: | Linear bar showing task completion or usage limits |
| 34 | Skeleton | :white_check_mark: | Placeholder shimmer while content loads (via `Shimmer`) |

---

## Overlays & Panels

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 35 | Modal | :white_check_mark: | Popup dialog for focused content or confirmations |
| 36 | Command Menu | :white_check_mark: | Full-screen action palette triggered by keyboard shortcut |
| 37 | Context Menu | :white_check_mark: | Right-click or long-press contextual action list |
| 38 | Drawer | :x: | Panel that slides in from a screen edge |
| 39 | Menu | :white_check_mark: | Dropdown action menu with typeahead and keyboard navigation |
| 40 | Sheet | :white_check_mark: | Side panel sliding from left or right screen edge |

---

## Navigation & Structure

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 41 | Accordion | :white_check_mark: | Vertically stacked collapsible content sections |
| 42 | Tabs | :white_check_mark: | Tabbed content switcher with active state |
| 43 | Pagination | :white_check_mark: | Page-level navigation with previous/next controls |
| 44 | Scroller | :white_check_mark: | Overflowing horizontal or vertical item list |
| 45 | Show More | :x: | Expand/collapse toggle for long content |
| 46 | Calendar | :white_check_mark: | Date or date-range picker |

---

## Layout & Containers

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 47 | Grid | :white_check_mark: | Grid layout system (partially via `GridItem`) |
| 48 | Material | :x: | Elevated surface with shadow and blur effects |
| 49 | Empty State | :x: | Placeholder for areas with no content yet |
| 50 | Project Banner | :x: | Project-wide notification bar requiring resolution |
| 51 | Book | :white_check_mark: | Responsive page-flip presentation component |

---

## Tooltip & Contextual Info

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 52 | Tooltip | :white_check_mark: | Contextual info popover on hover or focus |
| 53 | Context Card | :x: | Rich popover card with detailed information |

---

## Device Frames

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 54 | Browser | :white_check_mark: | Browser chrome wrapper for embedding screenshots |
| 55 | Phone | :white_check_mark: | Phone frame wrapper for mobile screenshots |

---

## Theming

| # | Component | Status | Description |
| --- | --- | --- | --- |
| 56 | Theme Switcher | :white_check_mark: | Toggle between light and dark color schemes |

---

## Summary

| Metric | Count |
| --- | --- |
| **Total Components** | 57 |
| **Available** | 45 |
| **To Build** | 12 |

---

## Existing Components (No Roadmap Changes)

These components are already in the library and are retained as-is:

| Component | Description |
| --- | --- |
| `Carousel` | Image/content carousel slider |
| `CheckListItem` | Checklist row with completion status |
| `Icon` | SVG icon renderer |
| `IconStack` | Layered icon display |
| `Img` | Image with loading and error states |
| `InputButton` | Input field combined with an action button |
| `ListItem` | Configurable list row with slots |
| `ModalAnimation` | Modal transition helper |
| `OverlayAnimation` | Overlay transition helper |
| `Step` | Single step within a stepper |
| `Stepper` | Multi-step progress indicator |
| `Toolbar` | Grouped action bar |
