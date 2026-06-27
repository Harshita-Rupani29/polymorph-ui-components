import type { Snippet } from 'svelte';

export type ToolbarProperties = ToolbarEventProperties & {
  showBackButton?: boolean;
  text?: string | null;
  backIcon?: string | null;
  leftContent?: Snippet;
  centerContent?: Snippet;
  rightContent?: Snippet;
  additionalContent?: Snippet;
  testId?: string;
  classes?: string;
};

export type ToolbarEventProperties = {
  onbackclick?: () => void;
  onkeydown?: (event: KeyboardEvent) => void;
};
