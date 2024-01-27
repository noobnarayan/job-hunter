import React, { useState } from "react";
import TextArea from "../components/Common/FormComponents/TextArea";
import SelectInput from "../components/Common/FormComponents/SelectInput";
import DynamicInputForm from "../components/Common/FormComponents/DynamicInputForm";
import InputField from "../components/Common/FormComponents/InputField";
import Checkbox from "../components/Common/FormComponents/Checkbox";
import SubmissionButton from "../components/Common/Buttons/SubmissionButton";

function JobPosting() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: [],
    requirements: [],
    skills: [],
    education: "",
    experience: "",
    salaryRange: {
      from: 0,
      to: 0,
    },
    type: "Full-time",
    location: "",
    employer: "",
    applicants: [],
    benefits: [],
    applicationDeadline: "",
    remoteWork: false,
    additionalRequirements: [],
    urgent: false,
    numberOfOpenings: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSalaryRangeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      salaryRange: {
        ...prevData.salaryRange,
        [name]: parseFloat(value),
      },
    }));
  };
  const handleArrayInputChange = (name, index, event) => {
    if (Array.isArray(event)) {
      setFormData((prevData) => ({ ...prevData, [name]: event }));
    } else {
      setFormData((prevData) => {
        const array = [...prevData[name]];
        array[index] = event.target.value;
        return { ...prevData, [name]: array };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to send formData to the backend
    console.log("Form submitted:", formData);
  };

  const jobTypeOptions = [
    { value: "default", label: "Select Job Type" },
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const roleOptions = [
    {
      label: "Technical Roles",
      options: [
        { value: "software_engineer", label: "Software Engineer" },
        { value: "data_scientist", label: "Data Scientist" },
        { value: "system_admin", label: "System Administrator" },
      ],
    },
    {
      label: "Management Roles",
      options: [
        { value: "project_manager", label: "Project Manager" },
        { value: "product_manager", label: "Product Manager" },
        { value: "team_lead", label: "Team Lead" },
      ],
    },
    {
      label: "Design Roles",
      options: [
        { value: "ui_designer", label: "UI Designer" },
        { value: "ux_designer", label: "UX Designer" },
        { value: "graphic_designer", label: "Graphic Designer" },
      ],
    },
  ];

  const experienceOptions = [
    { value: "0", label: "Less than 1 year" },
    { value: "1", label: "1 year" },
    { value: "2", label: "2 years" },
    { value: "3", label: "3 years" },
    { value: "4", label: "4 years" },
    { value: "5", label: "5 years" },
    { value: "6", label: "More than 5 years" },
  ];

  return (
    <div className="py-3 px-20">
      <div className="my-5">
        <h2 className="font-semibold text-2xl">New Job Posting</h2>
      </div>
      <div className="border rounded">
        <div className="p-3 font-medium text-lg px-5 border-b">
          1. Job Details
        </div>
        <div className="p-5">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <InputField
                label="Title"
                isRequired={true}
                placeholder="e.g. Software Engineer. Product Designer, etc."
                id="title"
                name="title"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <SelectInput
                label={"Type of position"}
                isRequired={true}
                id={"typeOfPosition"}
                options={jobTypeOptions}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <SelectInput
                label="Select your primary role"
                id="primaryRole"
                options={roleOptions}
                isRequired={true}
                optgroup={true}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <SelectInput
                label="Years of experience"
                id="yearsOfExperience"
                options={experienceOptions}
                isRequired={true}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                label={"Skills"}
                id={"skills"}
                isRequired={true}
                placeholder={"e.g. Python, React, Data Analysis"}
                description={
                  "Enter your skills separated by commas and spaces. For example, 'Python, React, Data Analysis'."
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                label="Education"
                id="education"
                value={formData.education}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                label="Location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>
                <InputField
                  label="Application Deadline"
                  isRequired={true}
                  placeholder="e.g. Software Engineer. Product Designer, etc."
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Checkbox
                label="Remote Work?"
                name="remoteWork"
                checked={formData.remoteWork}
                onChange={handleCheckboxChange}
              />
            </div>

            <div className="py-3 font-medium text-lg border-b">
              2. Additional Details
            </div>
            <div className=" flex flex-col gap-5">
              <div>
                <DynamicInputForm
                  label="Responsibilities"
                  placeholder="List the responsibilities of the position."
                  name="responsibilities"
                  values={formData.responsibilities}
                  handleInputChange={handleArrayInputChange}
                />
              </div>
              <div>
                <DynamicInputForm
                  label="Requirements"
                  placeholder="Specify the requirements for the position."
                  name="requirements"
                  values={formData.requirements}
                  handleInputChange={handleArrayInputChange}
                />
              </div>
              <div>
                <DynamicInputForm
                  label="Benefits"
                  placeholder="List the benefits of the position."
                  name="benefits"
                  values={formData.benefits}
                  handleInputChange={handleArrayInputChange}
                />
              </div>

              <div>
                <InputField
                  label="Additional Requirements"
                  placeholder={
                    "Specify any additional requirements for the job."
                  }
                  id="additionalRequirements"
                  name="additionalRequirements"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputField
                  label="Number of Openings"
                  id="numberOfOpenings"
                  type="number"
                  value={formData.numberOfOpenings}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-3">
                <InputField
                  label="Salary Range From"
                  id="from"
                  type="number"
                  value={formData.salaryRange.from}
                  onChange={handleSalaryRangeChange}
                />
                <InputField
                  label="Salary Range To"
                  id="to"
                  type="number"
                  value={formData.salaryRange.to}
                  onChange={handleSalaryRangeChange}
                />
              </div>

              <div>
                <Checkbox
                  label="Urgent?"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            <div>
              <TextArea
                label={"Description"}
                isRequired={true}
                placeholder={
                  "Describe the responsibilities of the position. You can always change this later."
                }
                id={"description"}
                name={"description"}
                onChange={handleInputChange}
              />
            </div>
            <SubmissionButton label="Submit" type="submit" className={"py-3"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobPosting;
