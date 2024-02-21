import React, { useState } from "react";

function WorkExperienceCard({
  exp,
  setShowAddWorkExperience,
  setWorkExperienceFormData,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { jobTitle, company, startMonth, description, endMonth } = exp;

  let formattedStartMonth = startMonth
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
      }).format(new Date(startMonth))
    : "N/A";
  let formattedEndMonth = endMonth
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
      }).format(new Date(endMonth))
    : "Present";

  const openEditForm = () => {
    setShowAddWorkExperience(true);
    setWorkExperienceFormData(exp);
  };
  return (
    <div className="border p-3.5 border-b-4 bg-gray-50 flex flex-col gap-3 rounded">
      <div className="flex justify-between">
        <div className="flex gap-6 text-sm">
          <div className="h-12 w-12 overflow-hidden border rounded-md p-px">
            <img src={company.logoUrl} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{company.name}</p>
            <p className="text-green-600">{jobTitle}</p>
            {startMonth && (
              <p className="text-gray-500">
                {formattedStartMonth} to {formattedEndMonth}
              </p>
            )}
          </div>
        </div>
        <div>
          <span
            className="text-sm text-gray-500 hover:cursor-pointer "
            onClick={openEditForm}
          >
            Edit
          </span>
        </div>
      </div>
      <div className="text-[.8rem] ml-10">
        <p
          className={`leading-5 text-left ${isExpanded ? "" : "line-clamp-3 "}`}
        >
          {description?.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>

        {description && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-medium text-green-700"
          >
            {isExpanded ? "Read less" : "Read more"}
          </span>
        )}
      </div>
    </div>
  );
}

export default WorkExperienceCard;
