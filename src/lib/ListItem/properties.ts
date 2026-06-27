import type { Snippet } from 'svelte';

export type ListItemProperties = ListItemEventProperties & {
  leftImageUrl?: string | null;
  leftImageFallbackUrl?: string | null;
  rightImageUrl?: string | null;
  label?: string | null;
  useAccordion?: boolean;
  rightContentText?: string | null;
  testId?: string;
  topSectionTestId?: string;
  rightImageTestId?: string;
  leftImageTestId?: string;
  centerTextTestId?: string;
  showLoader?: boolean;
  showRightContentLoader?: boolean;
  expand?: boolean;
  preventFocus?: boolean;
  leftContent?: Snippet;
  centerContent?: Snippet;
  rightContent?: Snippet;
  bottomContent?: Snippet;
  classes?: string;
  role?: string;
  ariaSelected?: boolean;
  id?: string;
};

export type ListItemEventProperties = {
  onleftimageclick?: (event: MouseEvent) => void;
  onrightimageclick?: (event: MouseEvent) => void;
  oncentertextclick?: (event: MouseEvent) => void;
  onitemclick?: (event: MouseEvent) => void;
  ontopsectionclick?: (event: MouseEvent) => void;
  onkeydown?: (event: KeyboardEvent) => void;
};
