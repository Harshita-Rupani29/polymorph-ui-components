import type { CustomValidator, InputDataType, TextTransformer, ValidationState } from '$lib/types';
import type { HTMLInputAttributes } from 'svelte/elements';

export type InputProperties = OptionalInputProperties &
  InputEventProperties &
  MandatoryInputProperties;

export type MandatoryInputProperties = {
  value: string;
};

export type OptionalInputProperties = {
  placeholder?: string | null;
  dataType?: InputDataType;
  label?: string | null;
  onErrorMessage?: string | null;
  infoMessage?: string | null;
  validators?: CustomValidator[];
  disable?: boolean;
  validationPattern?: RegExp | null;
  inProgressPattern?: RegExp | null;
  addFocusColor?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  actionInput?: boolean;
  useTextArea?: boolean;
  autoComplete?: HTMLInputAttributes['autocomplete'];
  name?: string;
  textTransformers?: TextTransformer[];
  textViewPresentation?: TextTransformer[];
  testId?: string;
  classes?: string;
  role?: string;
  ariaExpanded?: boolean;
  ariaAutocomplete?: 'none' | 'inline' | 'list' | 'both';
  ariaControls?: string | null;
  ariaActivedescendant?: string | null;
};

export type InputEventProperties = {
  oninput?: (value: string, event: Event) => void;
  onfocus?: (event: FocusEvent) => void;
  onfocusout?: (event: FocusEvent) => void;
  onblur?: (event: FocusEvent) => void;
  onpaste?: (event: ClipboardEvent) => void;
  onclick?: (event: MouseEvent) => void;
  onstatechange?: (state: ValidationState) => void;
  onkeydown?: (event: KeyboardEvent) => void;
};
