interface StepWrapperProps {
  children: any;
  isActive: boolean;
}

const StepWrapper = ({ children, isActive }: StepWrapperProps) => {
  return (
    <div className={`${isActive ? "flex flex-col" : "hidden"}`}>{children}</div>
  );
};

export default StepWrapper;
