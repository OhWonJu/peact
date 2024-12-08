import { FormSchema, Step2FormState } from "@/types/stepFromState";

import {
  InputField,
  SectionWrapper,
  SelectboxGroup,
  StepWrapper,
  SubTitle,
} from "@/components";

interface StepTwoProps {
  isActive: boolean;
  formStep: boolean[];
  formStepAction: Function;
  formValue: FormSchema;
  setFormValue: Function;
}

const StepTwo = ({
  isActive,
  formStep,
  formStepAction,
  formValue,
  setFormValue,
}: StepTwoProps) => {
  const checkFormCompleted = (newState: Step2FormState) => {
    const newFormStep = formStep;
    if (
      typeof newState.answer !== "undefined" &&
      typeof newState.selected !== "undefined"
    ) {
      newFormStep[1] = true;
      formStepAction(newFormStep);
    } else {
      newFormStep[1] = false;
      formStepAction(newFormStep);
    }
  };

  const answerChangeHandler = (answer: string) => {
    const newState = { ...formValue, answer };
    setFormValue(newState);
    window.sessionStorage.setItem("step2", JSON.stringify(newState));
    checkFormCompleted(newState);
  };

  const selectorChangeHandler = (selected: string) => {
    const newState = { ...formValue, selected };
    setFormValue(newState);
    window.sessionStorage.setItem("step2", JSON.stringify(newState));
    checkFormCompleted(newState);
  };

  return (
    <StepWrapper isActive={isActive}>
      <SectionWrapper title="Step2">
        <SubTitle title="textarea" />
        <InputField
          value={formValue.answer ?? ""}
          onChange={answerChangeHandler}
          placeholder="내 답변"
        />
      </SectionWrapper>

      <SectionWrapper>
        <SubTitle title="select" />
        <SelectboxGroup
          label="제일 좋아하는 과일을 선택하세요"
          selected={formValue?.selected}
          onChange={selectorChangeHandler}
          options={["사과", "바나나", "딸기"]}
        />
      </SectionWrapper>
    </StepWrapper>
  );
};

export default StepTwo;
