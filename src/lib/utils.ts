import {
  FormSchema,
  Step1FormState,
  Step2FormState,
} from "@/types/stepFromState";

export const formValidator = (formValue: FormSchema) =>
  Object.entries(formValue).every(([key, value]) => {
    if (key === "option") {
      return typeof value === "string";
    }
    if (key === "checkboxes") {
      return (
        Array.isArray(value) && value.every((item) => typeof item === "string")
      );
    }
    if (key === "answer") {
      return typeof value === "string";
    }
    if (key === "selected") {
      return typeof value === "string";
    }
    return false;
  });

export function formValueInitializer() {
  const step1 = JSON.parse(
    window.sessionStorage.getItem("step1") ?? "{}"
  ) as Step1FormState;
  const step2 = JSON.parse(
    window.sessionStorage.getItem("step2") ?? "{}"
  ) as Step2FormState;

  return {
    option: step1.option ?? undefined,
    checkboxes: step1.checkboxes ?? undefined,
    answer: step2.answer ?? undefined,
    selected: step2.selected ?? undefined,
  };
}
