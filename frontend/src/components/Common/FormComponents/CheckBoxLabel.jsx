import React from "react";

function CheckBoxLabel({ text }) {
  return (
    <div className="bg-green-500 flex gap-2 py-1 px-2.5 text-white w-fit items-center justify-center rounded-3xl mt-2.5 ">
      <i className="fa-solid fa-circle-check text-white"></i>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

export default CheckBoxLabel;
