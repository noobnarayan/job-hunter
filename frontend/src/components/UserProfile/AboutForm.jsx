import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService.js";
import InputField from "../Common/FormComponents/InputField.jsx";
import SelectInput from "../Common/FormComponents/SelectInput.jsx";
import SubmissionButton from "../Common/Buttons/SubmissionButton.jsx";
import useUpdateUserData from "../../hooks/useUpdateUserData.jsx";
function AboutForm({ userData }) {
  const initialFormData = {
    name: userData?.userProfile.name,
    location: userData?.userProfile.location,
    primaryRole: userData?.userProfile.primaryRole,
    yearsOfExperience: userData?.userProfile.yearsOfExperience,
    bio: userData?.userProfile.bio,
    profilePicture: userData?.userProfile.profilePicture,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isChanged, setIsChanged] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [updating, setUpdating] = useState(null);

  const updateUserData = useUpdateUserData();
  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        name: userData.userProfile.name,
        location: userData.userProfile.location,
        primaryRole: userData.userProfile.primaryRole,
        yearsOfExperience: userData.userProfile.yearsOfExperience,
        bio: userData.userProfile.bio,
        profilePicture: userData.userProfile.profilePicture,
      });
    }
  }, [userData]);

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(initialFormData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormData({ ...formData, profilePicture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
      try {
        setUploadProgress(true);
        const res = await userService.updateProfilePicture(file);
        if (res.status === 200) {
          updateUserData();
        }
        setUploadProgress(false);
      } catch (error) {
        console.error(`Error updating profile picture: ${error}`);
      }
    } else {
      setFormData({ ...formData, profilePicture: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await userService.updateUserProfile(formData);
      if (res.status === 200) {
        setIsChanged(false);
      }
      setUpdating(false);
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const locationOptions = [
    { value: "default", label: "Select Country" },
    { value: "india", label: "India" },
    { value: "united_states", label: "United States" },
    { value: "united_kingdom", label: "United Kingdom" },
    { value: "australia", label: "Australia" },
    { value: "canada", label: "Canada" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "japan", label: "Japan" },
    { value: "china", label: "China" },
    { value: "brazil", label: "Brazil" },
    { value: "south_africa", label: "South Africa" },
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
    <div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Your Name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          isRequired={true}
        />
        <div className="py-5 flex gap-5 items-center">
          <div className="rounded-full h-[4.5rem] w-[4.5rem] overflow-hidden border">
            <img src={formData.profilePicture} alt="User" />
          </div>
          <div>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              hidden
            />
            <button
              type="button"
              className="border border-black py-2 px-3 rounded-md font-medium text-sm"
              onClick={() => document.getElementById("profilePicture").click()}
            >
              {uploadProgress ? "Uploading..." : "Upload a new photo"}
            </button>
          </div>
        </div>
        <SelectInput
          label="Where are you based?"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          options={locationOptions}
          isRequired={true}
        />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/5 pr-2">
            <SelectInput
              label="Select your primary role"
              id="primaryRole"
              value={formData.primaryRole}
              onChange={handleInputChange}
              options={roleOptions}
              isRequired={true}
              optgroup={true}
            />
          </div>
          <div className="w-full md:w-2/5 pr-2">
            <SelectInput
              label="Years of experience"
              id="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              options={experienceOptions}
              isRequired={true}
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block font-medium">
            Your bio
          </label>
          <textarea
            id="address"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Stanford CS, Full stack generalist; launched a successful Android app, worked at Google"
            rows="5"
            cols="50"
            className="w-full p-2 rounded-lg border border-gray-400 my-2"
          ></textarea>
        </div>
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
              label={updating ? "Saving..." : "Save"}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default AboutForm;
