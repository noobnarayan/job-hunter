import React, { useState } from "react";

function AboutForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "india",
    role: "software_engineer",
    experience: "0",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
            <img
              src="https://photos.wellfound.com/users/16814996-medium_jpg?1699424460"
              alt="User"
            />
          </div>
          <div>
            <button className="border border-black py-2 px-3 rounded-md font-medium text-sm">
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
        <div className="flex">
          <div className="w-3/5 pr-2">
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
          <div className="w-2/5 pr-2">
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
            rows="4"
            cols="50"
            className="w-full p-2 rounded-lg border border-gray-400 my-2"
            required
          ></textarea>
        </div>
        <input
          type="submit"
          value="Save"
          className="w-full p-2 rounded-lg bg-gray-600 text-white hover:cursor-pointer font-medium text-lg"
        />
      </form>
    </div>
  );
}

export default AboutForm;
