import React, { useEffect, useState } from "react";
import SubmissionButton from "../Common/Buttons/SubmissionButton";
import InputField from "../Common/FormComponents/InputField";
import { externalApiServices } from "../../services/externalApiServices";

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
  const [showDropdown, setShowDropdown] = useState(true);

  const handleDropdown = (item) => {
    handleInstituteInput(item);
    setShowDropdown(!showDropdown);
  };

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
      const timeoutId = setTimeout(async () => {
        if (searchTerm) {
          const data = await externalApiServices.searchUniversities(searchTerm);
          setData(data);
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
          <div className={showDropdown ? "" : "hidden"}>
            <InputField
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
                      className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border hover:cursor-pointer"
                      onClick={() => handleDropdown(item)}
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
                      onClick={() => handleDropdown({ name: searchTerm })}
                    >
                      No results found for "{searchTerm}". Create "{searchTerm}
                      ".
                    </li>
                  )}
            </ul>
          </div>
          <div className={!showDropdown ? "" : "hidden"}>
            <label className="font-medium flex gap-2">
              Education
              <span className="text-gray-500">*</span>
            </label>
            <div className="my-2 px-2.5 py-2.5 bg-white border rounded-md flex justify-between items-center">
              <span>{formData.institution}</span>
              <i
                class="fa-solid fa-x text-gray-400 hover:cursor-pointer mr-3 text-xs"
                onClick={() => handleDropdown({ name: "" })}
              ></i>
            </div>
          </div>
        </div>
        <div>
          <InputField
            label="Start Date (Month/Year)"
            id="start"
            type="month"
            onChange={handleInputChange}
            isRequired={true}
          />
        </div>
        <div>
          <InputField
            label="End Date (Month/Year)"
            id="end"
            type="month"
            onChange={handleInputChange}
            isRequired={true}
          />
        </div>
        <div>
          <InputField
            label="Degree"
            id="degree"
            value={formData.degree}
            onChange={handleInputChange}
            isRequired={false}
            placeholder="Enter degree"
          />
          <InputField
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
