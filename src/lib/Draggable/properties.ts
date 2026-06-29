import type { Snippet } from 'svelte';

export type DragAxis = 'both' | 'x' | 'y';

export type DragPosition = {
  x: number;
  y: number;
};

export type DraggableProperties = OptionalDraggableProperties & DraggableEventProperties;

export type OptionalDraggableProperties = {
  x?: number;
  y?: number;
  axis?: DragAxis;
  handle?: string;
  bounds?: 'viewport' | null;
  disabled?: boolean;
  step?: number;
  dragLabel?: string;
  children?: Snippet;
  testId?: string;
  classes?: string;
};

export type DraggableEventProperties = {
  ondragstart?: (position: DragPosition) => void;
  ondrag?: (position: DragPosition) => void;
  ondragend?: (position: DragPosition) => void;
};
