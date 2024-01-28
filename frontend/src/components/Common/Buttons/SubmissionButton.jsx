import React from "react";

function SubmissionButton({ color, label, onClick, type, className }) {
  const buttonStyle = `p-2 px-4 font-medium text-sm rounded-md ${
    color === "white"
      ? "text-black"
      : "bg-black text-white hover:bg-green-500 hover:text-black"
  }`;

  return (
    <button type={type} onClick={onClick} className={buttonStyle}>
      {label}
    </button>
  );
}

export default SubmissionButton;
