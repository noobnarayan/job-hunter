import React, { useEffect, useState } from "react";
import axios from "axios";
import SubmissionButton from "../../components/Common/Buttons/SubmissionButton";
import TextInput from "../Common/FormComponents/TextInput";
import TextArea from "../Common/FormComponents/TextArea";
function WorkExperienceForm({ setShowAddWorkExperience }) {
  const initialFormData = {
    companyName: "",
    companyLogo: "",
    companyDomain: "",
    title: "",
    startDate: "",
    endDate: "",
    current: null,
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyApiData, setCompanyApiData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCompanyInput = (commpany) => {
    const { name, logo, domain } = commpany;

    setFormData({
      ...formData,
      companyName: name,
      companyLogo: logo,
      companyDomain: domain,
    });
  };

  useEffect(() => {
    if (isSearching) {
      const timeoutId = setTimeout(() => {
        if (searchTerm) {
          axios
            .get(
              `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchTerm}`
            )
            .then((response) => {
              setCompanyApiData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
              setCompanyApiData([]);
            });
        } else {
          setCompanyApiData([]);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 p-5">
      <form className="flex flex-col gap-2.5" onSubmit={handleFormSubmit}>
        <div>
          <TextInput
            label="Company"
            placeholder="Google"
            isRequired={true}
            onChange={handleSearch}
            id="name"
            name="name"
          />
          <ul className="list-none p-0 m-0">
            {searchTerm && companyApiData.length > 0
              ? companyApiData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border"
                    onClick={() => handleCompanyInput(item)}
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        {`https://${item.domain}`}
                      </span>
                    </div>
                  </li>
                ))
              : searchTerm && (
                  <li
                    className="flex items-center my-2 p-2 bg-white rounded-md shadow-sm border border-black hover:cursor-pointer"
                    onClick={() =>
                      handleCompanyInput({
                        name: searchTerm,
                        logo: null,
                        domain: null,
                      })
                    }
                  >
                    No results found for "{searchTerm}". Create "{searchTerm}".
                  </li>
                )}
          </ul>
        </div>
        <div>
          <TextInput
            label="Title"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={formData.jobtitle}
            isRequired={true}
            placeholder="SDE 1"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="font-medium">
            Start Date (Month/Year)<span className="text-gray-500">*</span>
          </label>
          <input
            type="month"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="font-medium">
            End Date (Month/Year)<span className="text-gray-500">*</span>
          </label>
          <input
            type="month"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
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
          <TextArea
            label="Description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
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

export default WorkExperienceForm;
