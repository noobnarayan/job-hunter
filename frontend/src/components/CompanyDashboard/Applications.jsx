import React, { useState } from "react";
import ApplicantsCard from "./ApplicantsCard";
import SelectInput from "../Common/FormComponents/SelectInput";

function Applications() {
  const [sortValue, setSortValue] = useState("latest valye");
  const sortOptions = [
    { value: "experience", label: "Experience" },
    { value: "date", label: "Application Date" },
  ];

  return (
    <div className="py-3 px-2 md:px-8 lg:px-20 ">
      <div className="font-medium text-2xl my-5 flex justify-between items-center">
        <span>Applications</span>
        <div className="flex items-center gap-3">
          <span className="text-sm">Sort by</span>
          <SelectInput options={sortOptions} value={sortValue} />
        </div>
      </div>
      <div className="border rounded p-5 flex flex-col gap-5">
        <ApplicantsCard />
        <ApplicantsCard />
        <ApplicantsCard />
        <ApplicantsCard />
      </div>
    </div>
  );
}

export default Applications;
