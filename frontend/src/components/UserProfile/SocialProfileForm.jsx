import React, { useEffect, useState } from "react";
import SubmissionButton from "../Common/Buttons/SubmissionButton";
import TextInput from "../Common/FormComponents/TextInput";

function SocialProfileForm() {
  const initialFormData = {
    website: "",
    linkedin: "",
    twitter: "",
    github: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(initialFormData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    console.log(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Website / Portfolio"
          id="website"
          value={formData.website}
          onChange={handleInputChange}
          isRequired={false}
          icon={<i className="fa-solid fa-globe"></i>}
          placeholder={"https://"}
        />
        <TextInput
          label="Linkedin"
          id="linkedin"
          value={formData.linkedin}
          onChange={handleInputChange}
          isRequired={false}
          icon={<i className="fa-brands fa-linkedin-in"></i>}
          placeholder={"https://www.linkedin.com/in/username"}
        />
        <TextInput
          label="Twitter"
          id="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
          isRequired={false}
          icon={<i className="fa-brands fa-twitter"></i>}
          placeholder={"https://twitter.com/username"}
        />
        <TextInput
          label="GitHub"
          id="github"
          value={formData.github}
          onChange={handleInputChange}
          isRequired={false}
          placeholder={"https://github.com/username"}
          icon={<i className="fa-brands fa-github"></i>}
        />
        {isChanged && (
          <div className="flex gap-6 my-4 justify-end">
            <SubmissionButton
              type="button"
              onClick={handleCancel}
              color="white"
              label="Cancel"
            />
            <SubmissionButton
              type="submit"
              onClick={handleSubmit}
              color="black"
              label="Save"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default SocialProfileForm;
