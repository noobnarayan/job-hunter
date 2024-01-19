import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_url } from "../../../config.js";
function AboutForm() {
  const initialFormData = {
    name: "Narayan Das",
    location: "",
    role: "",
    experience: "",
    bio: "",
    profilePicture:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormData({ ...formData, profilePicture: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
      updateProfilePicture(file);
    } else {
      setFormData({ ...formData, profilePicture: null });
    }
  };

  const updateProfilePicture = async (file) => {
    const formPayload = new FormData();
    formPayload.append("profilePicture", file);

    try {
      const response = await axios.post(
        `${api_url}/users/profile-picture`,
        formPayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error updating profile picture:", error.response);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setFormData(initialFormData);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="font-medium">
            Your Name<span className="text-gray-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
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
              Upload a new photo
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block font-medium">
            Where are you based?<span className="text-gray-500">*</span>
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg border border-gray-400 my-2 overflow-auto"
            required
          >
            <option value="india">India</option>
            <option value="united_states">United States</option>
            <option value="united_kingdom">United Kingdom</option>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="japan">Japan</option>
            <option value="china">China</option>
            <option value="brazil">Brazil</option>
            <option value="south_africa">South Africa</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/5 pr-2">
            <label htmlFor="role" className="block font-medium">
              Select your primary role
              <span className="text-gray-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-400 my-2 overflow-auto"
              required
            >
              <optgroup label="Technical Roles">
                <option value="software_engineer">Software Engineer</option>
                <option value="data_scientist">Data Scientist</option>
                <option value="system_admin">System Administrator</option>
              </optgroup>
              <optgroup label="Management Roles">
                <option value="project_manager">Project Manager</option>
                <option value="product_manager">Product Manager</option>
                <option value="team_lead">Team Lead</option>
              </optgroup>
              <optgroup label="Design Roles">
                <option value="ui_designer">UI Designer</option>
                <option value="ux_designer">UX Designer</option>
                <option value="graphic_designer">Graphic Designer</option>
              </optgroup>
            </select>
          </div>
          <div className="w-full md:w-2/5 pr-2">
            <label htmlFor="experience" className="block font-medium">
              Years of experience<span className="text-gray-500">*</span>
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-400 my-2 overflow-auto"
              required
            >
              <option value="0">Less than 1 year</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">More than 5 years</option>
            </select>
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
        )}
      </form>
    </div>
  );
}

export default AboutForm;
