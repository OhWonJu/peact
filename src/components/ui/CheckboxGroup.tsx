interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: Function;
}

const CheckboxGroup = ({
  label,
  options,
  selected,
  onChange,
}: CheckboxGroupProps) => {
  const handleCheckboxChange = (option: string) => {
    if (selected?.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="">
      <label>{label}</label>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selected.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
