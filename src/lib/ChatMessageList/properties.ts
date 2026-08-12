import type { Snippet } from 'svelte';
import type { ChatMessageData, ChatParty } from '../Chat/types';
import type { ChatMessageFeedback } from '../ChatMessage/properties';

export type ChatMessageListProperties = OptionalChatMessageListProperties &
  ChatMessageListEventProperties &
  MandatoryChatMessageListProperties;

export type MandatoryChatMessageListProperties = {
  messages: ChatMessageData[];
};

export type OptionalChatMessageListProperties = {
  autoscroll?: boolean;
  message?: Snippet<[ChatMessageData]>;
  empty?: Snippet;
  jumpLabel?: string;
  jumpIcon?: Snippet;
  allowCopy?: boolean;
  avatar?: Snippet<[ChatMessageData]>;
  avatarParty?: ChatParty | 'both';
  groupAvatars?: boolean;
  typing?: Snippet;
  messageAttachments?: Snippet<[ChatMessageData]>;
  renderHtml?: (message: ChatMessageData) => string;
  pinned?: Snippet;
  pinnedAfter?: (message: ChatMessageData, index: number) => boolean;
  testId?: string;
  classes?: string;
};

export type ChatMessageListEventProperties = {
  onretry?: () => void;
  onfeedback?: (value: ChatMessageFeedback, message: ChatMessageData) => void;
};
