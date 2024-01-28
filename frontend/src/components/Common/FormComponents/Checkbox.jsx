import React from "react";

function Checkbox({ label, name, checked, onChange }) {
  return (
    <label className="inline-flex items-center text-sm">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="form-checkbox rounded"
      />
      <span className="ml-2">{label}</span>
    </label>
  );
}

export default Checkbox;
