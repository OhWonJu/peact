interface TitleProps {
  title: string;
  className?: string;
}

const Title = ({ title, className }: TitleProps) => {
  const rootClassName = "text-4xl" + ` ${className}`;
  return <h1 className={rootClassName}>{title}</h1>;
};

export default Title;
