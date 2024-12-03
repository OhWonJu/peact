interface SubTitleProps {
  title: string;
  className?: string;
}

const SubTitle = ({ title, className }: SubTitleProps) => {
  const rootClassName = "text-xl mb-4" + ` ${className}`;
  return <h2 className={rootClassName}>{title}</h2>;
};

export default SubTitle;
