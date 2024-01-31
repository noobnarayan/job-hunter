import React, { useEffect, useState } from "react";
import TextArea from "../components/Common/FormComponents/TextArea";
import SelectInput from "../components/Common/FormComponents/SelectInput";
import DynamicInputForm from "../components/Common/FormComponents/DynamicInputForm";
import InputField from "../components/Common/FormComponents/InputField";
import Checkbox from "../components/Common/FormComponents/Checkbox";
import SubmissionButton from "../components/Common/Buttons/SubmissionButton";
import RadioButton from "../components/Common/FormComponents/RadioButton";
import SkillsSearch from "../components/Common/SkillsSearch";
import TextEditor from "../components/Common/FormComponents/TextEditor";

function JobPosting() {
  const [selectedSkills, setSelectedSkills] = useState(new Map());
  const [value, setValue] = useState("");

  // const textEditorConfig = {
  //   buttons: ["bold", "italic"],
  // };
  // console.log(value);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: [],
    requirements: [],
    skills: [],
    education: "software_engineer",
    experience: 0,
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
  console.log(formData);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      skills: Array.from(selectedSkills.keys()),
    }));
  }, [selectedSkills]);

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
                description="Enter the title of the job position you are posting."
                isRequired={true}
                placeholder="E.g., 'Software Engineer', 'Product Designer', etc."
                id="title"
                name="title"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <SelectInput
                label="Type of position"
                description="Select the type of position you are offering."
                isRequired={true}
                id="typeOfPosition"
                options={jobTypeOptions}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <SelectInput
                label="Select your primary role"
                description="Select the primary role that the candidate will be expected to perform."
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
                description="Select the minimum years of experience required for the position."
                id="yearsOfExperience"
                options={experienceOptions}
                isRequired={true}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="font-medium flex gap-2">
                <span>
                  Skills
                  <span className="text-gray-500">*</span>
                </span>
              </label>

              <span className="text-gray-500 text-sm ml-1.5 ">
                Input job's required skills from the dropdown in the 'Skills'
                field.
              </span>
              <SkillsSearch
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
              />
            </div>

            <div>
              <InputField
                label="Education"
                description="Specify the educational qualifications required for the position."
                id="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="E.g., 'Bachelor's in Computer Science'"
              />
            </div>
            <div>
              <InputField
                label="Location"
                description="Specify the work location for the position."
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="E.g., 'Bengaluru, India'"
              />
            </div>

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

            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-lg">Work Mode</span>
              <span className="text-sm text-gray-500">
                Please select your preferred work mode
              </span>
              <div className="flex space-x-4">
                <RadioButton
                  id="onsite"
                  name="workMode"
                  value="Onsite"
                  checked={formData.workMode === "Onsite"}
                  onChange={handleInputChange}
                  label="Onsite"
                />
                <RadioButton
                  id="hybrid"
                  name="workMode"
                  value="Hybrid"
                  checked={formData.workMode === "Hybrid"}
                  onChange={handleInputChange}
                  label="Hybrid"
                />
                <RadioButton
                  id="remote"
                  name="workMode"
                  value="Remote"
                  checked={formData.workMode === "Remote"}
                  onChange={handleInputChange}
                  label="Remote"
                />
              </div>
            </div>

            <div className="py-3 font-medium text-lg border-b">
              2. Additional Details
            </div>
            <div className=" flex flex-col gap-5">
              <div>
                <DynamicInputForm
                  label="Responsibilities"
                  description="Enter the responsibilities associated with the position here. These could include tasks that the person in this role would be expected to perform, duties they would need to carry out, and any responsibilities they would have. Each responsibility should be entered separately. Click on 'Add' after typing each responsibility."
                  name="responsibilities"
                  values={formData.responsibilities}
                  handleInputChange={handleArrayInputChange}
                  placeholder="E.g., 'Manage team meetings'"
                />
              </div>
              <div>
                <DynamicInputForm
                  label="Requirements"
                  description="Enter the requirements for the position here. These could include necessary skills, qualifications, or experiences that the candidate should possess. Each requirement should be entered separately. Click on 'Add' after typing each requirement."
                  name="requirements"
                  values={formData.requirements}
                  handleInputChange={handleArrayInputChange}
                  placeholder="E.g., 'Minimum 5 years of experience in management'"
                />
              </div>
              <div>
                <DynamicInputForm
                  label="Benefits"
                  description="List the benefits associated with the position here. These could include health insurance, retirement plans, paid time off, or other perks offered by your company. Each benefit should be entered separately. Click on 'Add' after typing each benefit."
                  name="benefits"
                  values={formData.benefits}
                  handleInputChange={handleArrayInputChange}
                  placeholder="E.g., 'Health insurance coverage'"
                />
              </div>

              <div>
                <InputField
                  label="Additional Requirements"
                  description="Specify any additional requirements for the job that were not covered in the main requirements section."
                  placeholder="Specify any additional requirements for the job."
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
                  description="Enter the number of vacancies for this position."
                  value={formData.numberOfOpenings}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-3">
                <InputField
                  label="Salary Range From"
                  id="from"
                  type="number"
                  description="Enter the minimum salary for this position."
                  value={formData.salaryRange.from}
                  onChange={handleSalaryRangeChange}
                />
                <InputField
                  label="Salary Range To"
                  id="to"
                  type="number"
                  description="Enter the maximum salary for this position."
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
              <TextEditor
                label={"Description"}
                isRequired={true}
                placeholder={
                  "Provide a detailed description of the position. This could include the responsibilities, tasks, and expectations associated with the role."
                }
                id={"description"}
                name={"description"}
                onChange={handleInputChange}
                aiButton={true}
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
