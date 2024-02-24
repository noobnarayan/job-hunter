import React, { useState } from "react";

function EducationCard({ setShowAddEducation, setEducationFormData, edu }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear()
    );
  };

  const { institution, degree, fieldOfStudy, startYear, endYear } = edu;

  const formattedStartYear = getFormattedDate(startYear + "-01");
  const formattedEndYear = getFormattedDate(endYear + "-01");

  const openEditForm = () => {
    setShowAddEducation(true);
    setEducationFormData(edu);
  };
  return (
    <div className="border p-3.5 border-b-4 bg-gray-50 flex flex-col gap-3 rounded">
      <div className="flex justify-between">
        <div className="flex gap-6 text-sm">
          <div className="h-12 w-12 overflow-hidden border rounded-md p-px">
            <img src="https://wellfound.com/images/shared/nopic_college.png" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{institution}</p>
            <p className="">
              {fieldOfStudy}, {degree}
            </p>
            <p className="text-gray-500 text-sm">
              {formattedStartYear} to {formattedEndYear}
            </p>
            {/* <p className="text-gray-500 text-sm">9.5 CGPA</p> */}
          </div>
        </div>
        <div>
          <span
            className="text-sm text-gray-500 hover:cursor-pointer"
            onClick={openEditForm}
          >
            Edit
          </span>
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
