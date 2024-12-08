import { FormSchema, Step1FormState } from "@/types/stepFromState";

import {
  SectionWrapper,
  StepWrapper,
  SubTitle,
  RadioGroup,
  CheckboxGroup,
} from "@/components";

interface StepOneProps {
  isActive: boolean;
  formStep: boolean[];
  formStepAction: Function;
  formValue: FormSchema;
  setFormValue: Function;
}

const StepOne = ({
  isActive,
  formStep,
  formStepAction,
  formValue,
  setFormValue,
}: StepOneProps) => {
  const checkFormCompleted = (newState: Step1FormState) => {
    const newFormStep = formStep;
    if (
      typeof newState.option !== "undefined" &&
      typeof newState.checkboxes !== "undefined" &&
      newState.checkboxes.length > 0
    ) {
      newFormStep[0] = true;
      formStepAction(newFormStep);
    } else {
      newFormStep[0] = false;
      formStepAction(newFormStep);
    }
  };

  const optionChangeHandler = (option: string) => {
    const newState = { ...formValue, option };
    setFormValue(newState);
    window.sessionStorage.setItem("step1", JSON.stringify(newState));
    checkFormCompleted(newState);
  };

  const checkboxesChangeHandler = (checkboxes: string[]) => {
    const newState = { ...formValue, checkboxes };
    setFormValue(newState);
    window.sessionStorage.setItem("step1", JSON.stringify(newState));
    checkFormCompleted(newState);
  };

  return (
    <StepWrapper isActive={isActive}>
      <SectionWrapper>
        <SubTitle title="radio input" />
        <RadioGroup
          label="선호하는 옵션을 선택하세요"
          options={["옵션 1", "옵션 2", "옵션 3"]}
          selected={formValue.option}
          onChange={optionChangeHandler}
        />
      </SectionWrapper>

      <SectionWrapper>
        <SubTitle title="checkbox input" />
        <CheckboxGroup
          label="관심사를 선택하세요"
          options={["React", "Vue", "Angular"]}
          selected={formValue.checkboxes ?? []}
          onChange={checkboxesChangeHandler}
        />
      </SectionWrapper>
    </StepWrapper>
  );
};

export default StepOne;
