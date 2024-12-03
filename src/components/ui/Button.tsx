interface ButtonProps {
  children: any;
  variant: "PLAIN" | "LINK" | "SYMBOL";
  disable?: boolean;
  className?: string;
  onClick: () => void;
}

const Button = ({
  children,
  variant,
  disable,
  className,
  onClick,
}: ButtonProps) => {
  const STYLE_MAP = {
    PLAIN: `bg-white px-6  ${disable ? "text-neutral-400" : "text-purple-800"}`,
    LINK: "text-blue-700 underline",
    SYMBOL: `px-6 ${
      disable ? "bg-white text-neutral-400" : "bg-purple-800 text-white "
    }`,
  };

  const style = STYLE_MAP[variant];

  return (
    <button
      data-variant={variant}
      className={`py-2 rounded-md grid place-items-center ${style} ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default Button;
