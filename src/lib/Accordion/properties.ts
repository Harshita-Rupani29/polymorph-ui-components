import type { Snippet } from 'svelte';

export type AccordionProperties = {
  expand?: boolean;
  children?: Snippet;
  testId?: string;
  classes?: string;
};
