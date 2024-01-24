import React from "react";

function TextInput({
  label,
  id,
  value,
  onChange,
  isRequired,
  icon,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={id} className="font-medium flex gap-2">
        {icon && <span>{icon}</span>}
        <span>
          {label}
          {isRequired && <span className="text-gray-500">*</span>}
        </span>
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
        required={isRequired}
      />
    </div>
  );
}

export default TextInput;
