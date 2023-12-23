import React from "react";

function Searchbar() {
  return (
    <div>
      <div className="flex text-gray-400 items-center py-2 px-5 border shadow rounded-xl gap-10 font-light">
        {/* first */}
        <div className="flex items-center justify-center w-[45%] gap-3 border-r-2 border-gray-300">
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="border-gray-500">
            <input
              type="text"
              name="search"
              placeholder="Search job title or keyword"
              className="w-72 h-8 px-1 focus:outline-none focus:ring-1 focus:ring-gray-200 rounded"
            />
          </div>
        </div>

        {/* second */}
        <div className="flex items-center justify-center gap-3 w-[55%]">
          <div>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div className="">
            <input
              type="text"
              name="search"
              placeholder="Preferred location"
              className="w-full h-8 px-1 focus:outline-none focus:ring-1 focus:ring-gray-200 rounded"
            />
          </div>
          <div className="ml-10">
            <button className="bg-green-600 text-white font-medium rounded-lg py-2 px-6">
              Find jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
