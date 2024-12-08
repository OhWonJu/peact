import { useState } from "./core/peact";

import { formValueInitializer } from "./lib/utils";
import { FormSchema } from "./types/stepFromState";

import { StepOne, StepThree, StepTwo } from "./steps";

import { Layout, SectionWrapper, Title } from "./components";

function App() {
  const stepMap = [StepOne, StepTwo, StepThree];
  const [step, setStep] = useState(0);
  const [isStepFormCompleted, setStepFormCompleted] = useState(
    Array(stepMap.length).fill(false)
  );

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
            formStep={isStepFormCompleted}
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
