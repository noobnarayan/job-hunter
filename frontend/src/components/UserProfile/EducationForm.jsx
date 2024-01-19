import axios from "axios";
import React, { useEffect, useState } from "react";

function EducationForm({ setShowAddEducation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      const timeoutId = setTimeout(() => {
        if (searchTerm) {
          axios
            .get(`http://universities.hipolabs.com/search?name=${searchTerm}`)
            .then((response) => {
              setData(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
              setData([]);
            });
        } else {
          setData([]);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, isSearching]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsSearching(true);
  };

  const handleCancel = () => {
    setShowAddEducation(false);
  };

  return (
    <div className="bg-gray-100 p-5">
      <form className="flex flex-col gap-2.5">
        <div>
          <label htmlFor="name" className="font-medium">
            Education<span className="text-gray-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="College/University"
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 mt-2"
            onChange={handleSearch}
          />
          <ul className="list-none p-0 m-0 scrollable-list">
            {searchTerm && data.length > 0
              ? data.slice(0, 5).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border"
                  >
                    <div className="flex flex-col ">
                      <span className="font-semibold">{`${item?.name}, ${
                        item["state-province"]
                          ? `${item["state-province"]},  ${item?.alpha_two_code}`
                          : item?.alpha_two_code
                      }`}</span>
                      <span className="text-sm text-gray-500">
                        {`https://${item.domains ? item.domains[0] : ""}`}
                      </span>
                    </div>
                  </li>
                ))
              : searchTerm && (
                  <li className="flex items-center my-2 p-2 bg-white rounded-md shadow-sm border border-black hover:cursor-pointer">
                    No results found for "{searchTerm}". Create "{searchTerm}".
                  </li>
                )}
          </ul>
        </div>

        <div>
          <label htmlFor="start" className="font-medium">
            Start Date (Month/Year)<span className="text-gray-500">*</span>
          </label>
          <input
            type="month"
            id="start"
            name="start"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>

        <div>
          <label htmlFor="end" className="font-medium">
            End Date (Month/Year)<span className="text-gray-500">*</span>
          </label>
          <input
            type="month"
            id="end"
            name="end"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <div>
          <label htmlFor="degree" className="font-medium">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <div>
          <label htmlFor="degree" className="font-medium">
            Major
          </label>
          <input
            type="text"
            id="major"
            name="major"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>

        <div className="flex gap-6 my-4 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 px-4 bg-black hover:bg-green-500 hover:text-black text-white font-medium text-sm rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
