import React from "react";
import Searchbar from "./Searchbar";
import SideBarFilter from "./SideBarFilter";
import JobCard from "./JobCard";
function MainJobSection() {
  return (
    <div className="flex px-5 gap-5 mt-20">
      <div className="filters border rounded-xl w-[30%]">
        <SideBarFilter />
      </div>
      <div className="jobs w-[70%]">
        <div>
          <Searchbar />
        </div>
        <div>
          <div className="text-gray-500 font-medium my-3 ml-1.5">
            <span>250 Jobs results</span>
          </div>
          <div>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainJobSection;
