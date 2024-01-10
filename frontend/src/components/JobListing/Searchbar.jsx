import React from "react";

function Searchbar() {
  return (
    <>
      <div className="flex flex-col text-gray-400 items-center py-5 md:py-2 px-6 md:px-5 border shadow rounded-xl gap-6 md:gap-10 font-light md:flex-row">
        {/* first */}
        <div className="flex items-center justify-center w-full gap-3 border-r-2 border-gray-300 md:border-r md:w-[45%]">
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="border-gray-500">
            <input
              type="text"
              name="search"
              placeholder="Search job title or keyword"
              className="w-72 h-8 px-1 focus:outline-none focus:ring-1 focus:ring-gray-200 rounded "
            />
          </div>
        </div>

        {/* second */}
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between w-full md:w-[55%] ">
          <div className="flex justify-center items-center gap-3 w-full">
            <div>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="w-full">
              <input
                type="text"
                name="search"
                placeholder="Preferred location"
                className="w-full h-8 px-1 focus:outline-none focus:ring-1  rounded"
              />
            </div>
          </div>

          <div className="w-full flex items-center md:justify-end">
            <button className="bg-green-600 text-white font-medium rounded-lg py-2.5 px-7 md:w-8/12 w-full">
              Find jobs
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
