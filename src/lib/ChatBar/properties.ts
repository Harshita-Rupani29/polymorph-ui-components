import type { Snippet } from 'svelte';

export type ChatBarMode = 'anchored' | 'docked';

export type ChatBarProperties = OptionalChatBarProperties &
  ChatBarEventProperties &
  MandatoryChatBarProperties;

export type MandatoryChatBarProperties = {
  children: Snippet;
};

export type OptionalChatBarProperties = {
  mode?: ChatBarMode;
  anchor?: HTMLElement | null;
  maxWidth?: number;
  bottomGutter?: number;
  sideGutter?: number;
  morph?: boolean;
  morphDuration?: number;
  active?: boolean;
  testId?: string;
  classes?: string;
};

export type ChatBarEventProperties = {
  onmorphend?: () => void;
};
