import React, { useState } from "react";
import ApplicantsCard from "./ApplicantsCard";
import SelectInput from "../Common/FormComponents/SelectInput";

function Shortlisted() {
  const [sortValue, setSortValue] = useState("latest value");
  const sortOptions = [
    { value: "experience", label: "Experience" },
    { value: "date", label: "Application Date" },
  ];

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <div className="py-3 px-2 md:px-8 lg:px-20 ">
      <div className="font-medium text-2xl my-5 flex flex-col md:flex-row gap-3 justify-between md:items-center ml-5 md:ml-0">
        <span>Shortlisted Candidates</span>
        <div className="flex items-center gap-3">
          <span className="text-sm">Sort by</span>
          <SelectInput
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <div className="border rounded p-1.5 md:p-5 flex flex-col gap-5">
        <ApplicantsCard isShortlisted={true} />
        <ApplicantsCard isShortlisted={true} />
        <ApplicantsCard isShortlisted={true} />
        <ApplicantsCard isShortlisted={true} />
      </div>
    </div>
  );
}

export default Shortlisted;
