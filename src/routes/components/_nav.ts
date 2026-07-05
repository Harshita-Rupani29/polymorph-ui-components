import { resolve } from '$app/paths';
import type { AppTypes } from '$app/types';

// Every component route is a static `/components/<slug>` page. Derive the valid
// slug union from the app's generated Pathname type so nav entries are checked
// against real routes at compile time and resolve() accepts the built path.
// The generic parameter forces the conditional type to distribute over each
// member of the Pathname union.
type ExtractComponentSlug<T> = T extends `/components/${infer Slug}` ? Slug : never;
export type ComponentSlug = ExtractComponentSlug<ReturnType<AppTypes['Pathname']>>;

// resolve() needs a single literal pathname per call, so it can't take a
// union-typed slug directly. Keeping the slug a naked generic parameter lets it
// resolve to one concrete `/components/<slug>` route at each call site (those
// stay fully type-checked). resolve()'s conditional argument type can't be
// proven for the generic template inside the body, so it is suppressed here —
// the constructed path is always a valid route by construction of ComponentSlug.
export function resolveComponentPath<Slug extends ComponentSlug>(slug: Slug) {
  // @ts-expect-error - generic `/components/${Slug}` is a valid Pathname but not statically provable against resolve()'s conditional arg type
  return resolve(`/components/${slug}`);
}

export type NavItem = {
  name: string;
  slug: ComponentSlug;
};

export type NavGroup = {
  category: string;
  items: NavItem[];
};

export const componentNav: NavGroup[] = [
  {
    category: 'Layout & Containers',
    items: [
      { name: 'Browser', slug: 'browser' },
      { name: 'Phone', slug: 'phone' },
      { name: 'Book', slug: 'book' },
      { name: 'Resizable', slug: 'resizable' },
      { name: 'Draggable', slug: 'draggable' }
    ]
  },
  {
    category: 'Navigation',
    items: [
      { name: 'Tabs', slug: 'tabs' },
      { name: 'Stepper', slug: 'stepper' },
      { name: 'Pagination', slug: 'pagination' },
      { name: 'Scroller', slug: 'scroller' },
      { name: 'Toolbar', slug: 'toolbar' }
    ]
  },
  {
    category: 'Form Controls',
    items: [
      { name: 'Input', slug: 'input' },
      { name: 'InputButton', slug: 'input-button' },
      { name: 'Checkbox', slug: 'checkbox' },
      { name: 'Radio', slug: 'radio' },
      { name: 'Toggle', slug: 'toggle' },
      { name: 'Select', slug: 'select' },
      { name: 'Combobox', slug: 'combobox' },
      { name: 'Slider', slug: 'slider' },
      { name: 'Calendar', slug: 'calendar' },
      { name: 'Choicebox', slug: 'choicebox' },
      { name: 'ColorPicker', slug: 'color-picker' },
      { name: 'SplitInput', slug: 'split-input' }
    ]
  },
  {
    category: 'Buttons & Actions',
    items: [
      { name: 'Button', slug: 'button' },
      { name: 'SplitButton', slug: 'split-button' },
      { name: 'Pill', slug: 'pill' },
      { name: 'KeyboardInput', slug: 'keyboard-input' }
    ]
  },
  {
    category: 'Data Display',
    items: [
      { name: 'Table', slug: 'table' },
      { name: 'Accordion', slug: 'accordion' },
      { name: 'ListItem', slug: 'list-item' },
      { name: 'GridItem', slug: 'grid-item' },
      { name: 'CheckListItem', slug: 'check-list-item' },
      { name: 'Badge', slug: 'badge' },
      { name: 'IconStack', slug: 'icon-stack' },
      { name: 'Snippet', slug: 'snippet' },
      { name: 'RelativeTime', slug: 'relative-time' }
    ]
  },
  {
    category: 'Feedback & Status',
    items: [
      { name: 'Toast', slug: 'toast' },
      { name: 'Banner', slug: 'banner' },
      { name: 'Progress', slug: 'progress' },
      { name: 'Gauge', slug: 'gauge' },
      { name: 'Loader', slug: 'loader' },
      { name: 'LoadingDots', slug: 'loading-dots' },
      { name: 'Shimmer', slug: 'shimmer' }
    ]
  },
  {
    category: 'Overlays',
    items: [
      { name: 'Modal', slug: 'modal' },
      { name: 'Sheet', slug: 'sheet' },
      { name: 'Menu', slug: 'menu' },
      { name: 'ContextMenu', slug: 'context-menu' },
      { name: 'CommandMenu', slug: 'command-menu' },
      { name: 'Tooltip', slug: 'tooltip' }
    ]
  },
  {
    category: 'Media',
    items: [
      { name: 'Avatar', slug: 'avatar' },
      { name: 'Icon', slug: 'icon' },
      { name: 'Img', slug: 'img' },
      { name: 'Gallery', slug: 'gallery' },
      { name: 'MediaPlayer', slug: 'media-player' },
      { name: 'MediaUpload', slug: 'media-upload' }
    ]
  },
  {
    category: 'Chat',
    items: [
      { name: 'Chat', slug: 'chat' },
      { name: 'ChatMessage', slug: 'chat-message' },
      { name: 'ChatMessageList', slug: 'chat-message-list' },
      { name: 'ChatComposer', slug: 'chat-composer' },
      { name: 'ChatHeader', slug: 'chat-header' },
      { name: 'ChatToolStatus', slug: 'chat-tool-status' },
      { name: 'ChatSuggestions', slug: 'chat-suggestions' },
      { name: 'ChatBubble', slug: 'chat-bubble' }
    ]
  },
  {
    category: 'Theming',
    items: [{ name: 'ThemeSwitcher', slug: 'theme-switcher' }]
  }
];

export const firstSlug = componentNav[0].items[0].slug;
