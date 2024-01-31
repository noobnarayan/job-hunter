import React, { useState, useEffect } from "react";
import JobDetailsCard from "../components/JobDetails/JobDetailsCard";
import SimilerJobsSidebar from "../components/JobDetails/SimilerJobsSidebar";
import { contentService } from "../services/contentService";
import { useParams } from "react-router-dom";
import JobDescription from "../components/JobDetails/JobDescription";

function JobDetails() {
  const [jobData, setJobData] = useState({});
  const { id } = useParams();
  const getDetails = async (id) => {
    try {
      const res = await contentService.getSingleJob(id);
      setJobData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails(id);
  }, []);
  return (
    <div className="mt-20 px-10 flex gap-14">
      {/* Left */}
      <div className="w-[65%] flex flex-col gap-6">
        <JobDetailsCard jobData={jobData} />
        <JobDescription jobData={jobData} />
      </div>
      {/* Right */}
      <div className="w-[35%]">
        <SimilerJobsSidebar />
      </div>
    </div>
  );
}

export default JobDetails;
