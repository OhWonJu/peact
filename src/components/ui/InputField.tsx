interface InputFieldProps {
  label?: string;
  value: string;
  onChange: Function;
  type?: "text" | "email" | "tel";
  placeholder: string;
}

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
