import React, { useState } from "react";

function EducationCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border p-3.5 border-b-4 bg-gray-50 flex flex-col gap-3 rounded">
      <div className="flex justify-between">
        <div className="flex gap-6 text-sm">
          <div className="h-12 w-12 overflow-hidden border rounded-md p-px">
            <img src="https://wellfound.com/images/shared/nopic_college.png" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">North Bengal University</p>
            <p className="">English Language and Literature, BA</p>
            <p className="text-gray-500 text-sm">Mar 2018 to May 2022</p>
            <p className="text-gray-500 text-sm">9.5 CGPA</p>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Edit</span>
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
