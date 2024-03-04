import React, { useEffect, useState } from "react";
import { contentService } from "../../services/contentService";

function Searchbar({ setSearch, setSelectedLocation }) {
  const [location, setLocation] = useState([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const getLocations = async () => {
    if (locationQuery) {
      try {
        const res = await contentService.getJobLocations(locationQuery);
        setLocation(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSearching) {
      const timerId = setTimeout(() => {
        getLocations();
      }, 500);

      return () => clearTimeout(timerId);
    }
  }, [locationQuery, isSearching]);

  const handleLocationInputChange = (e) => {
    setLocationQuery(e.target.value);
    setIsSearching(true);
  };

  const handleLocationSelection = (value) => {
    setLocationQuery(value);
    setLocation([]);
    setIsSearching(false);
  };

  const handleFindJob = () => {
    setSelectedLocation(locationQuery);
  };

  return (
    <>
      <div className="flex flex-col text-gray-400 items-center py-5 md:py-2 px-6 md:px-5 border shadow rounded-xl gap-6 md:gap-10 font-light lg:flex-row">
        {/* first */}
        <div className="flex items-center  w-full gap-3 lg:border-r-2 border-gray-300  lg:w-[45%] ">
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="border-gray-500">
            <input
              type="text"
              name="search"
              placeholder="Search job title or keyword"
              className="w-full h-8 px-1 focus:outline-none focus:ring-0 rounded border-none "
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* second */}
        <div className="flex flex-col lg:flex-row items-center gap-5 justify-between w-full lg:w-[55%] ">
          <div className="flex justify-start lg:justify-center items-center gap-3 w-full">
            <div>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                name="search"
                placeholder="Preferred location"
                className="w-full h-8 px-1 focus:outline-none focus:ring-0 border-none rounded"
                onChange={handleLocationInputChange}
                value={locationQuery}
              />
              {location.length > 0 && (
                <div className="absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white z-10">
                  <ul className="py-1 text-base leading-6 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                    {location.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="text-gray-900 select-none relative py-2 pl-3 pr-9 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleLocationSelection(item)}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-center lg:justify-end mt-5 lg:mt-0">
            <button
              className="bg-green-600 text-white font-medium rounded-lg py-2.5 px-7 lg:w-8/12 w-full"
              onClick={handleFindJob}
            >
              Find jobs
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
