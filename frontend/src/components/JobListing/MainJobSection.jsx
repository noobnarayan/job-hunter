import React, { useState } from "react";
import Searchbar from "./Searchbar";
import SideBarFilter from "./SideBarFilter";
import JobCard from "./JobCard";
import { useEffect } from "react";
import { contentService } from "../../services/contentService";
import { useNavigate } from "react-router-dom";

function MainJobSection() {
  const [filters, setFilters] = useState({
    datePosted: "",
    jobTypes: [],
    experience: 30,
    salaryRange: {
      from: 0,
      to: 10000000000,
    },
    workMode: [],
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const getJobs = async (filters) => {
    setLoading(true);
    try {
      const res = await contentService.getJobs(filters);
      if (res) {
        setJobs(res.jobs);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(selectedLocation);
    const debounceTimer = setTimeout(() => {
      getJobs({ ...filters, search, location: selectedLocation });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters, search, selectedLocation]);

  const redirectToDetail = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="flex flex-col px-5 md:px-14 lg:px-5 gap-5 lg:flex-row">
      {/* Left */}
      <div className="border rounded-xl w-full lg:w-[30%] mlg:sticky top-0 lg:h-screen mb-3 hidden lg:block">
        <SideBarFilter filters={filters} setFilters={setFilters} />
      </div>

      {/* Right */}
      <div className=" rounded-xl w-full lg:w-[70%] overflow-auto">
        <div>
          <Searchbar
            setSearch={setSearch}
            search={search}
            setSelectedLocation={setSelectedLocation}
          />
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
