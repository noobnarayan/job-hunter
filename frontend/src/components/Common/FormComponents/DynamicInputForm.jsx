import React from "react";
import SubmissionButton from "../Buttons/SubmissionButton";

function DynamicInputForm({
  label,
  placeholder,
  name,
  values,
  handleInputChange,
}) {
  const handleAddFields = () => {
    handleInputChange(name, values.length, { target: { value: "" } });
  };

  const handleRemoveFields = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    handleInputChange(name, index, newValues);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className=" font-medium my-2">{label}</label>
      <div className="space-y-3">
        {values.map((value, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(event) => handleInputChange(name, index, event)}
              className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <SubmissionButton
              color="white"
              label="Remove"
              onClick={() => handleRemoveFields(index)}
              type="button"
            />
          </div>
        ))}
        <SubmissionButton
          color="black"
          label="Add"
          onClick={handleAddFields}
          type="button"
        />
      </div>
    </div>
  );
}

export default DynamicInputForm;
