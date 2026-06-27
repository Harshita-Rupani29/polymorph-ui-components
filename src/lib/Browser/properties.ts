import type { Snippet } from 'svelte';

export type BrowserProperties = OptionalBrowserProperties;

export type OptionalBrowserProperties = {
  url?: string;
  title?: string;
  showAddressBar?: boolean;
  showTabBar?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  testId?: string;
  children?: Snippet;
  lockIcon?: Snippet;
  classes?: string;
};
