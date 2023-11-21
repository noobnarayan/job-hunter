import React from "react";
import Searchbar from "./Searchbar";
function MainJobSection() {
  return (
    <div className="flex px-5 gap-5">
      <div className="filters bg-blue-200 w-2/6"></div>
      <div className="jobs bg-red-200 w-4/6">
        <Searchbar />
      </div>
    </div>
  );
}

export default MainJobSection;
