import React from "react";

function Checkbox({ label, name, id, checked, onChange, className }) {
  return (
    <label className="inline-flex items-center text-sm">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        className="form-checkbox rounded focus:ring-2 focus:ring-green-500 text-green-600 hover:cursor-pointer"
      />
      <span className={`ml-2 ${className}`}>{label}</span>
    </label>
  );
}

export default Checkbox;
