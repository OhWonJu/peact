import { FormSchema } from "@/types/stepFromState";

import { Button, SectionWrapper, StepWrapper } from "@/components";
import { formValueInitializer } from "@/lib/utils";

interface StepThreeProps {
  isActive: boolean;
  formValue: FormSchema;
  formStepAction: Function;
  setFormValue: Function;
}

const StepThree = ({
  isActive,
  formValue,
  formStepAction,
  setFormValue,
}: StepThreeProps) => {
  const initHandler = () => {
    formStepAction(0);
    window.sessionStorage.removeItem("step1");
    window.sessionStorage.removeItem("step2");
    setFormValue(formValueInitializer());
  };

  return (
    <StepWrapper isActive={isActive}>
      <SectionWrapper>
        <p>{JSON.stringify(formValue)}</p>

        <Button variant="LINK" onClick={initHandler}>
          <span>처음으로</span>
        </Button>
      </SectionWrapper>
    </StepWrapper>
  );
};

export default StepThree;
