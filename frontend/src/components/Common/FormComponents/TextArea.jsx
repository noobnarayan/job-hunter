import React from "react";

function TextArea({ label, id, value, onChange, placeholder, isRequired }) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
        {isRequired && <span className="text-gray-500">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="5"
        cols="50"
        className="w-full p-2 rounded-lg border border-gray-400 my-2"
        required={isRequired}
      ></textarea>
    </div>
  );
}

export default TextArea;
