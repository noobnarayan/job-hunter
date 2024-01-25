import React from "react";

function SelectInput({
  label,
  id,
  value,
  onChange,
  options,
  isRequired,
  optgroup,
  className,
}) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block font-medium">
        {label}
        {isRequired && <span className="text-gray-500">*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-lg border border-gray-400 my-2 overflow-auto"
        required={isRequired}
      >
        {optgroup
          ? options.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))
          : options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
    </div>
  );
}

export default SelectInput;
