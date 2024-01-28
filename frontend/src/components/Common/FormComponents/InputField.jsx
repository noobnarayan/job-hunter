import React from "react";

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  isRequired,
  icon,
  placeholder,
  className,
  description,
}) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="font-medium flex gap-2">
        {icon && <span>{icon}</span>}
        <span>
          {label}
          {isRequired && <span className="text-gray-500">*</span>}
        </span>
      </label>
      {description && (
        <span className="text-gray-500 text-sm ml-1.5 ">{description}</span>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded-sm border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
        required={isRequired}
      />
    </div>
  );
}

export default InputField;
