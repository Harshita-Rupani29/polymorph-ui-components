<script lang="ts">
  import { fade } from 'svelte/transition';
  import ChatHeader from '../ChatHeader/ChatHeader.svelte';
  import ChatMessageList from '../ChatMessageList/ChatMessageList.svelte';
  import ChatComposer from '../ChatComposer/ChatComposer.svelte';
  import ChatSuggestions from '../ChatSuggestions/ChatSuggestions.svelte';
  import ChatToolStatus from '../ChatToolStatus/ChatToolStatus.svelte';
  import type { ChatProperties } from './properties';

  let {
    messages,
    value = $bindable(''),
    title = '',
    subtitle = '',
    image,
    imageAlt = '',
    placeholder = '',
    disabled = false,
    streaming = false,
    recording = false,
    autoscroll = true,
    toolStatus = null,
    suggestions = [],
    attachments = $bindable([]),
    accept = '',
    multiple = false,
    allowCopy = false,
    closeLabel = 'Close',
    showClose,
    showComposer = true,
    toolStatusPlacement = 'inline',
    background,
    headerAvatar,
    headerActions,
    headerContent,
    message,
    messageAvatar,
    avatarParty = 'both',
    groupAvatars = false,
    messageTyping,
    messageAttachments,
    renderHtml,
    pinned,
    pinnedAfter,
    empty,
    composerLeading,
    sendIcon,
    stopIcon,
    voiceIcon,
    attachIcon,
    onsend,
    onsuggestion,
    onclose,
    onstop,
    onvoice,
    onattach,
    onretry,
    onfeedback,
    testId,
    classes
  }: ChatProperties = $props();

  let showHeader = $derived(
    title.length > 0 ||
      subtitle.length > 0 ||
      (typeof image === 'string' && image.length > 0) ||
      typeof onclose === 'function' ||
      typeof headerAvatar === 'function' ||
      typeof headerActions === 'function'
  );
  let showSuggestions = $derived(suggestions.length > 0 && messages.length === 0);
  let floatingStatus = $derived(toolStatus !== null && toolStatusPlacement === 'floating');
  let inlineStatus = $derived(toolStatus !== null && toolStatusPlacement === 'inline');
  // A floating status is absolutely positioned, so it does not by itself give the footer height.
  // Without this, `showComposer={false}` would leave the footer's padding as unexplained space.
  let footerHasContent = $derived(showComposer || showSuggestions || inlineStatus);

  function handleSuggestion(suggestionValue: string, index: number): void {
    if (typeof onsuggestion === 'function') {
      onsuggestion(suggestionValue, index);
      return;
    }
    onsend?.(suggestionValue, []);
  }
</script>

<section
  class="chat {classes ?? ''}"
  class:has-background={typeof background === 'function'}
  data-pw={testId}
>
  {#if typeof background === 'function'}
    <!-- `inert` as well as aria-hidden: aria-hidden alone hides it from assistive technology but
         still lets any focusable element inside receive keyboard focus. -->
    <div class="background" aria-hidden="true" inert>{@render background()}</div>
  {/if}

  {#if showHeader}
    <ChatHeader
      {title}
      {subtitle}
      {image}
      {imageAlt}
      {closeLabel}
      {showClose}
      {onclose}
      avatar={headerAvatar}
      actions={headerActions}
      children={headerContent}
    />
  {/if}

  <ChatMessageList
    {messages}
    {autoscroll}
    {message}
    {empty}
    {allowCopy}
    {avatarParty}
    {groupAvatars}
    {messageAttachments}
    {renderHtml}
    {pinned}
    {pinnedAfter}
    avatar={messageAvatar}
    typing={messageTyping}
    {onretry}
    {onfeedback}
  />

  <div class="footer" class:empty={!footerHasContent}>
    {#if floatingStatus && toolStatus !== null}
      <div class="tool-status floating" transition:fade={{ duration: 200 }}>
        <ChatToolStatus label={toolStatus.label} />
      </div>
    {/if}
    {#if showSuggestions}
      <ChatSuggestions items={suggestions} {disabled} onselect={handleSuggestion} />
    {/if}
    {#if inlineStatus && toolStatus !== null}
      <div class="tool-status"><ChatToolStatus label={toolStatus.label} /></div>
    {/if}
    {#if showComposer}
      <ChatComposer
        bind:value
        bind:attachments
        {placeholder}
        {disabled}
        {streaming}
        {recording}
        {accept}
        {multiple}
        onsubmit={onsend}
        {onstop}
        {onvoice}
        {onattach}
        leading={composerLeading}
        {sendIcon}
        {stopIcon}
        {voiceIcon}
        {attachIcon}
      />
    {/if}
  </div>
</section>

<style>
  .chat {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: var(--chat-height, 100%);
    width: var(--chat-width, 100%);
    background: var(--chat-background, #ffffff);
    border: var(--chat-border, none);
    border-radius: var(--chat-border-radius, 0);
    overflow: hidden;
  }

  /* Only a chat that was actually given a background becomes a positioning context, so
     consumers without one see byte-identical layout to before. */
  .chat.has-background {
    position: relative;
  }

  .background {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .chat.has-background > :not(.background) {
    position: relative;
    z-index: 1;
  }

  .footer {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--chat-footer-gap, 10px);
    padding: var(--chat-footer-padding, 12px 1.5rem);
    background: var(--chat-footer-background, transparent);
    border-top: var(--chat-footer-border-top, none);
  }

  /* Still rendered, because a floating tool status is positioned against it. */
  .footer.empty {
    padding: 0;
    border-top: none;
  }

  .tool-status {
    display: flex;
    justify-content: var(--chat-tool-status-justify, center);
  }

  /* Floating placement lifts the status out of the footer flow so it hovers over the
     message list instead of displacing the composer as it appears and disappears. */
  .tool-status.floating {
    position: absolute;
    left: 0;
    right: 0;
    bottom: var(--chat-tool-status-floating-bottom, 100%);
    margin-bottom: var(--chat-tool-status-floating-offset, 8px);
    pointer-events: none;
  }
</style>
