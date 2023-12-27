import React from "react";
import JobDetailsCard from "../components/JobDetails/JobDetailsCard";
import SimilerJobsSidebar from "../components/JobDetails/SimilerJobsSidebar";

function JobDetails() {
  return (
    <div className="mt-20 px-10 flex gap-14">
      {/* Left */}
      <div className="w-[65%]">
        <JobDetailsCard />
      </div>
      {/* Right */}
      <div className="w-[35%]">
        <SimilerJobsSidebar />
      </div>
    </div>
  );
}

export default JobDetails;
