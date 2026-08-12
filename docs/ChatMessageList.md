# ChatMessageList

A scrollable, auto-scrolling container for a conversation. It renders each message with `ChatMessage` by default. To add your own UI below a bubble, pass `messageAttachments` — it receives each `ChatMessageData` and keeps the default bubble along with its copy/retry/feedback actions. Use the `message` snippet only when you want to replace a message entirely, which forgoes that default rendering. When there are no messages, the `empty` snippet is shown. With `autoscroll` enabled, newly appended messages re-pin the list to the latest message. If the reader scrolls up while no new message arrives, a **jump-to-latest** button appears. Opt-in message actions (`allowCopy`, `onretry`, `onfeedback`) are applied to the default-rendered messages: copy and feedback on assistant messages, retry on the most recent assistant message. Implemented with a Svelte action (no effects), respecting `prefers-reduced-motion`.

## Usage

```svelte
<script>
  import { ChatMessageList } from 'polymorph-ui-components';

  let messages = $state([
    { id: '1', role: 'user', content: 'Hi' },
    { id: '2', role: 'assistant', content: 'Hello!' }
  ]);
</script>

<ChatMessageList {messages} />
```

## Props

| Prop       | Type                          | Required | Default | Description                                                       |
| ---------- | ----------------------------- | -------- | ------- | --------------------------------------------------------------- |
| messages   | `ChatMessageData[]`           | Yes      | `-`     | Messages to render.                                             |
| autoscroll | `boolean`                     | No       | `true`  | Re-pin to the latest message when a message is appended; keep growing content in view while already near the bottom. |
| message    | `Snippet<[ChatMessageData]>`  | No       | `-`     | Custom per-message rendering; overrides the default bubble.    |
| empty      | `Snippet`                     | No       | `-`     | Shown when there are no messages.                              |
| jumpLabel  | `string`                      | No       | `'Jump to latest'` | Aria-label for the jump-to-latest button.          |
| jumpIcon   | `Snippet`                     | No       | `-`     | Custom jump-to-latest icon. Falls back to a built-in asset.   |
| allowCopy  | `boolean`                     | No       | `false` | Show copy buttons on assistant messages (default rendering).  |
| avatar     | `Snippet<[ChatMessageData]>`  | No       | `-`     | Avatar rendered beside each message.                            |
| avatarParty | `'sender' \| 'responder' \| 'both'` | No | `'both'` | Restrict avatars to one side. Messages on the other side get neither an avatar nor reserved space. |
| groupAvatars | `boolean`                   | No       | `false` | Show the avatar only on the first message of a consecutive run by the same party; the rest reserve the space. |
| typing     | `Snippet`                     | No       | `-`     | Replaces the built-in dots shown while a message streams with no content yet. |
| messageAttachments | `Snippet<[ChatMessageData]>` | No | `-`     | Content rendered below each message's bubble — product cards, citations, previews. Invoked for every message; an empty result takes no layout space. |
| renderHtml | `(message: ChatMessageData) => string` | No | `-` | Derives the HTML body for a message, e.g. rendering and sanitizing markdown. Falls back to `message.html`. |
| pinned     | `Snippet`                     | No       | `-`     | A single persistent node placed after the message matched by `pinnedAfter`. |
| pinnedAfter | `(message: ChatMessageData, index: number) => boolean` | No | `-` | Picks the message the pinned node follows. The last match wins; hidden when nothing matches. |
| testId     | `string`                      | No       | `-`     | `data-pw` on the root element.                                 |
| classes    | `string`                      | No       | `-`     | Class string on the root element.                             |

## Events

| Event      | Type                                                       | Description                                          |
| ---------- | ---------------------------------------------------------- | --------------------------------------------------- |
| onretry    | `() => void`                                               | Enables retry on the most recent assistant message. |
| onfeedback | `(value: 'up' \| 'down', message: ChatMessageData) => void`| Enables feedback on assistant messages.             |

## The pinned slot

`pinned` renders a single node at a fixed position in the template, between the messages up to and including the `pinnedAfter` match and the messages after it. It is deliberately **not** rendered inside the message loop, so it keeps its DOM identity as messages stream in around it — which matters when it hosts something expensive or stateful, such as an embedded checkout, a map, or a media player that must not be torn down and rebuilt.

DOM order matches visual order, so screen readers and tab order follow the same sequence sighted users see.

The wrapper carries `aria-live="off"`, opting the pinned subtree out of the list's `role="log"` live region. Without that, a stateful widget's internal updates — a checkout advancing a step, a player's timecode — would be announced as though new messages had arrived. Give your own pinned content whatever labelling it needs; the list does not label it for you.

```svelte
<ChatMessageList
  {messages}
  pinned={checkout}
  pinnedAfter={(m) => m.attachments?.some((a) => a.type === 'cart') ?? false}
/>
```

## Reserving space for a floating composer

When the composer sits outside the list — see `ChatBar` — reserve room at the bottom through the existing padding variable, so the last message is never covered:

```css
.my-chat {
  --chat-message-list-padding: 0.75rem 1.5rem 140px;
}
```

## CSS Variables

| Variable                              | Default        | CSS Property    | Description                          |
| ------------------------------------- | -------------- | --------------- | ------------------------------------ |
| `--chat-message-list-gap`             | `1rem`         | gap             | Gap between messages.                |
| `--chat-message-list-padding`         | `0.75rem 1.5rem` | padding       | Padding of the list.                 |
| `--chat-message-list-scroll-behavior` | `smooth`       | scroll-behavior | Scroll behavior (auto when reduced motion). |
| `--chat-message-list-jump-size`       | `36px`         | height/width    | Size of the jump-to-latest button.   |
| `--chat-message-list-jump-bottom`     | `8px`          | bottom          | Sticky offset of the jump button.    |
| `--chat-message-list-jump-background-color` | `#ffffff` | background      | Jump button background.              |
| `--chat-message-list-jump-color`      | `#52525b`      | color           | Jump button icon color.              |
| `--chat-message-list-jump-border`     | `1px solid #e4e4e7` | border     | Jump button border.                  |
| `--chat-message-list-jump-box-shadow` | `0 4px 12px rgba(0,0,0,0.12)` | box-shadow | Jump button shadow.          |

## Web Component

Tag: `<pui-chat-message-list>`

```html
<pui-chat-message-list></pui-chat-message-list>
```

Set `.messages` via JavaScript.
