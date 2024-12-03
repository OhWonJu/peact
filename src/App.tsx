import { Layout, SectionWrapper, Title } from "./components";
import { useState } from "./core/useState";
import { StepOne, StepThree, StepTwo } from "./steps";
import {
  FormSchema,
  Step1FormState,
  Step2FormState,
} from "./types/stepFromState";

function App() {
  const stepMap = [StepOne, StepTwo, StepThree];
  const [step, setStep] = useState(0);
  const [isStepFormCompleted, setStepFormCompleted] = useState(false);

  const formValueInitializer = () => {
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
  };

  const [formValue, setFormValue] = useState<FormSchema>(
    formValueInitializer()
  );

  return (
    <div id="app" className="w-[100dvw] h-[100dvh] py-6 bg-purple-100">
      <Layout
        step={step}
        setStep={setStep}
        maxStep={stepMap.length - 1}
        isStepFormCompleted={isStepFormCompleted}
        formValue={formValue}
      >
        <SectionWrapper>
          <Title title="Survey" />
        </SectionWrapper>
        {stepMap.map((Step, index) => (
          <Step
            isActive={index === step}
            key={index}
            formStepAction={
              index === stepMap.length - 1 ? setStep : setStepFormCompleted
            }
            formValue={formValue}
            setFormValue={setFormValue}
          />
        ))}
      </Layout>
    </div>
  );
}

export default App;
