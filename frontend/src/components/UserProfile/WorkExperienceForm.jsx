import React, { useState } from "react";
import SubmissionButton from "../../components/Common/Buttons/SubmissionButton";
import InputField from "../Common/FormComponents/InputField";
import TextArea from "../Common/FormComponents/TextArea";
import CompanySearch from "../Common/CompanySearch";
import Checkbox from "../Common/FormComponents/Checkbox";
import { userService } from "../../services/userService.js";
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      workExperience: [
        {
          jobTitle: formData.title,
          company: {
            name: formData.companyName,
            logoUrl: formData.companyLogo,
            domain: formData.companyDomain,
          },
          startMonth: formData.startDate,
          startMonth: formData.endDate,
          currentJob: formData.current,
          description: formData.description,
        },
      ],
    };
    try {
      const res = await userService.updateUserProfile(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
            value={formData.jobTitle}
            isRequired={true}
            placeholder="SDE 1"
          />
        </div>
        <div>
          <InputField
            label="Start Date (Month/Year)"
            type="month"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            isRequired={true}
          />
        </div>

        <div>
          <InputField
            label="End Date (Month/Year)"
            type="month"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            isRequired={true}
          />
        </div>
        <div className="ml-2">
          <Checkbox label="I currently work here" id="current" name="current" />
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
