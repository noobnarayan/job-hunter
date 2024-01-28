import React from "react";

const RadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  className,
}) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="form-radio text-green-600 focus:ring-2 focus:ring-green-500 hover:cursor-pointer"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={`ml-2 ${className}`}>{label}</span>
    </label>
  );
};

export default RadioButton;
