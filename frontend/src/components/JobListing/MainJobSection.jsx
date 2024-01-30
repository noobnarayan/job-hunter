import React, { useState } from "react";
import Searchbar from "./Searchbar";
import SideBarFilter from "./SideBarFilter";
import JobCard from "./JobCard";
import { useEffect } from "react";
import { contentService } from "../../services/contentService";
import { useNavigate } from "react-router-dom";

function MainJobSection() {
  const [filters, setFilters] = useState({
    datePost: "",
    jobTypes: [],
    experience: 30,
    salaryRange: {
      from: null,
      to: null,
    },
    workMode: [],
  });

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const getJobs = async () => {
    try {
      const res = await contentService.getJobs();
      if (res.jobs.length > 0) {
        setJobs(res.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const redirectToDetail = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="flex flex-col px-5 gap-5 mt-20 md:flex-row">
      <div className="border rounded-xl w-full md:w-[30%]">
        <SideBarFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className=" w-full md:w-[70%]">
        <div>
          <Searchbar />
        </div>
        <div>
          <div className="text-gray-500 font-medium my-3 ml-1.5">
            <span>{jobs.length} Jobs results</span>
          </div>
          <div>
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                redirectToDetail={redirectToDetail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainJobSection;
