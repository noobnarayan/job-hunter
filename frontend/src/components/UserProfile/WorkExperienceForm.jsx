import React, { useState } from "react";
import SubmissionButton from "../../components/Common/Buttons/SubmissionButton";
import InputField from "../Common/FormComponents/InputField";
import TextArea from "../Common/FormComponents/TextArea";
import CompanySearch from "../Common/CompanySearch";
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
  const [showDropdown, setShowDropdown] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdown = (item) => {
    handleCompanyInput(item);
    setShowDropdown(!showDropdown);
  };

  const handleCompanyInput = (company) => {
    const { name, logo, domain } = company;

    setFormData({
      ...formData,
      companyName: name,
      companyLogo:
        logo ||
        "https://photos.wellfound.com/startups/i/267839-22e9550a168c9834c67a3e55e2577688-medium_jpg.jpg?buster=1677467708",
      companyDomain: domain,
    });
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
          <div className={showDropdown ? "" : "hidden"}>
            <CompanySearch handleDropdown={handleDropdown} />
          </div>
          <div className={!showDropdown ? "" : "hidden"}>
            <label className="font-medium flex gap-2">
              Company
              <span className="text-gray-500">*</span>
            </label>
            <div className="flex justify-between items-center my-1 p-2 bg-white rounded-md shadow-sm border">
              <div className="flex items-center ">
                <img
                  src={formData.companyLogo}
                  alt={formData.companyName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{formData.companyName}</span>
              </div>
              <i
                className="fa-solid fa-x text-gray-400 hover:cursor-pointer mr-3 text-xs"
                onClick={() => handleDropdown({ name: "", logo: "" })}
              ></i>
            </div>
          </div>
        </div>
        <div>
          <InputField
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
