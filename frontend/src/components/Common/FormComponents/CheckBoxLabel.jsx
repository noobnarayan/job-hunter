import React from "react";

function formatLabel(text) {
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function CheckBoxLabel({ text }) {
  return (
    text && (
      <div className="bg-green-500 flex gap-2 py-1 px-2.5 text-white w-fit items-center justify-center rounded-3xl mt-2.5 ">
        <i className="fa-solid fa-circle-check text-white"></i>
        <span className="text-sm font-medium">{formatLabel(text)}</span>
      </div>
    )
  );
}

export default CheckBoxLabel;
