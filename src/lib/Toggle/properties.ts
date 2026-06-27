export type ToggleProperties = ToggleEventProperties & {
  checked?: boolean;
  text: string;
  testId?: string;
  classes?: string;
};

export type ToggleEventProperties = {
  onclick?: (checked: boolean) => void;
};
