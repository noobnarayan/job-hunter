import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkExperienceForm({ setShowAddWorkExperience }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      const timeoutId = setTimeout(() => {
        if (searchTerm) {
          axios
            .get(
              `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchTerm}`
            )
            .then((response) => {
              setData(response.data);
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
    setShowAddWorkExperience(false);
  };

  return (
    <div className="bg-gray-100 p-5">
      <form className="flex flex-col gap-2.5">
        <div>
          <label htmlFor="name" className="font-medium">
            Company<span className="text-gray-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 mt-2"
            onChange={handleSearch}
          />
          <ul className="list-none p-0 m-0">
            {searchTerm && data.length > 0
              ? data.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border"
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="font-semibold">{item.name}</span>
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
          <label htmlFor="title" className="font-medium">
            Title<span className="text-gray-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
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
        <div className="flex gap-3 items-center mb-3">
          <input
            type="checkbox"
            id="current"
            name="current"
            className="form-checkbox h-4 w-4 rounded "
          />
          <label htmlFor="current" className="font-medium ">
            I currently work here
          </label>
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="5"
            cols="50"
            className="w-full p-2 rounded-lg border border-gray-400 my-2"
          ></textarea>
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

export default WorkExperienceForm;
