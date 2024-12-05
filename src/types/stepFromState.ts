export type Step1FormState = {
  option?: string;
  checkboxes?: string[];
};

export type Step2FormState = {
  answer?: string;
  selected?: string;
};

export type FormSchema = Step1FormState & Step2FormState;
