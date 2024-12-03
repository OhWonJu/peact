import React from "react";

interface RadioGroupProps {
  label: string;
  options: string[];
  selected?: string;
  onChange: Function;
}

const RadioGroup = ({
  label,
  options,
  selected,
  onChange,
}: RadioGroupProps) => {
  return (
    <div className="">
      <label>{label}</label>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            value={option}
            checked={selected === option}
            onChange={() => onChange(option)}
          />
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
