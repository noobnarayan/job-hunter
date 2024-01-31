import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor({
  label,
  id,
  value,
  onChange,
  placeholder,
  isRequired,
  aiButton,
  description,
  handleGenerate,
  generatingDescription,
}) {
  const handleEditorChange = (content, editor) => {
    onChange({ target: { name: id, value: content } });
  };

  return (
    <div>
      <label htmlFor={id} className="font-medium flex justify-between my-2.5">
        <div className="flex items-center">
          {label}
          {isRequired && <span className="text-gray-500 ml-2">*</span>}
        </div>
        {aiButton && (
          <div className="flex justify-end">
            <span
              className={`bg-black w-36 py-1 px-1 text-xs text-white text-center rounded cursor-pointer ${
                generatingDescription ? "hover:cursor-wait" : ""
              }`}
              onClick={handleGenerate}
            >
              {generatingDescription
                ? "Generating... ⏳"
                : "✨ Generate using AI"}
            </span>
          </div>
        )}
      </label>
      {description && (
        <span className="text-gray-500 text-sm ml-1.5 ">{description}</span>
      )}
      <Editor
        id={id}
        apiKey={import.meta.env.VITE_TINY_MCE_API}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          plugins:
            "autolink charmap codesample emoticons link lists  searchreplace  visualblocks wordcount checklist casechange  pageembed permanentpen footnotes  advcode  mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough |  mergetags | align  | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          branding: false,
          menubar: false,
          height: "20rem",
        }}
      />
    </div>
  );
}

export default TextEditor;
