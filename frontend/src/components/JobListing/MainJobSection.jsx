import React from "react";
import Searchbar from "./Searchbar";
import SideBarFilter from "./SideBarFilter";
function MainJobSection() {
  return (
    <div className="flex px-5 gap-5 mt-20">
      <div className="filters border rounded-xl w-[30%]">
        <SideBarFilter />
      </div>
      <div className="jobs bg-red-200 h-32 w-[70%]">{/* <Searchbar /> */}</div>
    </div>
  );
}

export default MainJobSection;
