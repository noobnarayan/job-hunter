import React, { useState, useEffect } from "react";
import JobDetailsCard from "../components/JobDetails/JobDetailsCard";
import SimilerJobsSidebar from "../components/JobDetails/SimilerJobsSidebar";
import { contentService } from "../services/contentService";

function JobDetails() {
  const [jobData, setJobData] = useState({});

  const getDetails = async (id) => {
    try {
      const res = await contentService.getSingleJob(id);
      setJobData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails("65aac74b9e3ff2e12cf9e794");
  }, []);
  return (
    <div className="mt-20 px-10 flex gap-14">
      {/* Left */}
      <div className="w-[65%]">
        <JobDetailsCard jobData={jobData} />
      </div>
      {/* Right */}
      <div className="w-[35%]">
        <SimilerJobsSidebar />
      </div>
    </div>
  );
}

export default JobDetails;
