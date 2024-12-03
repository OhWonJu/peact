interface SelectboxGroupProps {
  label: string;
  options: string[];
  selected?: string;
  onChange: Function;
}

const SelectboxGroup = ({
  label,
  options,
  selected,
  onChange,
}: SelectboxGroupProps) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option selected disabled hidden>
          과일 선택하기
        </option>
        {options.map((option) => (
          <option selected={selected === option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectboxGroup;
