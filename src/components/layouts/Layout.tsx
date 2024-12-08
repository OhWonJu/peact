import { FormSchema } from "@/types/stepFromState";
import { formValidator } from "@/lib/utils";

import { Button } from "../ui";

interface LayoutProps {
  children: any;
  step: number;
  maxStep: number;
  setStep: Function;
  isStepFormCompleted: boolean[];
  formValue: FormSchema;
}

const Layout = ({
  children,
  step,
  setStep,
  maxStep,
  isStepFormCompleted,
  formValue,
}: LayoutProps) => {
  const isFormValidated = formValidator(formValue);

  const forwardStepHandler = () => {
    if (step < maxStep) setStep(step + 1);
  };
  const backwardStepHandler = () => {
    if (step > 0) setStep(step - 1);
  };

  const submitHandler = () => {
    setStep(maxStep);
  };

  return (
    <div className="max-w-3xl px-4 mx-auto">
      {children}
      <div className="flex space-x-4 mt-4">
        {step < maxStep - 1 && (
          <Button
            variant="PLAIN"
            disable={!isStepFormCompleted[step]}
            onClick={forwardStepHandler}
          >
            <span>다음</span>
          </Button>
        )}
        {step > 0 && step < maxStep && (
          <Button variant="PLAIN" onClick={backwardStepHandler}>
            <span>뒤로</span>
          </Button>
        )}
        {step === maxStep - 1 && (
          <div>
            <Button
              variant="SYMBOL"
              disable={!isFormValidated}
              onClick={submitHandler}
            >
              <span>제출</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
