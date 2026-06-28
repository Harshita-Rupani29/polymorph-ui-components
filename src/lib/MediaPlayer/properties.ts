import type { Snippet } from 'svelte';

export type MediaPlayerProperties = OptionalMediaPlayerProperties &
  MediaPlayerEventProperties &
  MandatoryMediaPlayerProperties;

export type MediaType = 'image' | 'video';

export type MandatoryMediaPlayerProperties = {
  src: string;
  type: MediaType;
};

export type OptionalMediaPlayerProperties = {
  alt?: string;
  fallback?: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
  playing?: boolean;
  muted?: boolean;
  playIcon?: Snippet;
  pauseIcon?: Snippet;
  muteIcon?: Snippet;
  unmuteIcon?: Snippet;
  testId?: string;
  classes?: string;
};

export type MediaPlayerEventProperties = {
  onplay?: (event: Event) => void;
  onpause?: (event: Event) => void;
  onvolumechange?: (muted: boolean) => void;
};
