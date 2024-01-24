import axios from "axios";
import React, { useEffect, useState } from "react";
import SubmissionButton from "../Common/Buttons/SubmissionButton";
import TextInput from "../Common/FormComponents/TextInput";

function EducationForm({ setShowAddEducation }) {
  const initialFormData = {
    institution: "",
    start: "",
    end: "",
    degree: "",
    major: "",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInstituteInput = (institution) => {
    const { name } = institution;
    setFormData({
      ...formData,
      institution: name,
    });
  };
  useEffect(() => {
    if (isSearching) {
      const timeoutId = setTimeout(() => {
        if (searchTerm) {
          axios
            .get(`http://universities.hipolabs.com/search?name=${searchTerm}`)
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
    setShowAddEducation(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="bg-gray-100 p-5">
      <form className="flex flex-col gap-2.5">
        <div>
          <TextInput
            label="Education"
            id="name"
            onChange={handleSearch}
            isRequired={true}
            placeholder="College/University"
          />
          <ul className="list-none p-0 m-0 scrollable-list">
            {searchTerm && data.length > 0
              ? data.slice(0, 5).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border"
                    onClick={() => handleInstituteInput(item)}
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
                  <li
                    className="flex items-center my-2 p-2 bg-white rounded-md shadow-sm border border-black hover:cursor-pointer"
                    onClick={() => handleInstituteInput({ name: searchTerm })}
                  >
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <div>
          <TextInput
            label="Degree"
            id="degree"
            value={formData.degree}
            onChange={handleInputChange}
            isRequired={false}
            placeholder="Enter degree"
          />
          <TextInput
            label="Major"
            id="major"
            value={formData.major}
            onChange={handleInputChange}
            isRequired={false}
            placeholder="Enter major"
          />
        </div>

        <div className="flex gap-6 my-4 justify-end">
          <SubmissionButton
            type="button"
            onClick={handleCancel}
            color="white"
            label="Cancel"
          />
          <SubmissionButton
            type="submit"
            onClick={handleFormSubmit}
            color="black"
            label="Save"
          />
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
