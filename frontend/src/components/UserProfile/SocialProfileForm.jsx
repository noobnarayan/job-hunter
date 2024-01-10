import React, { useEffect, useState } from "react";

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
        <div>
          <label htmlFor="website" className="font-medium flex gap-2">
            <span>
              <i className="fa-solid fa-globe"></i>
            </span>
            Website / Portfolio
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="font-medium flex gap-2">
            <span>
              <i className="fa-brands fa-linkedin-in"></i>
            </span>
            Linkedin
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="https://www.linkedin.com/in/username"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <div>
          <label htmlFor="twitter" className="font-medium flex gap-2">
            <span>
              <i className="fa-brands fa-twitter"></i>
            </span>
            Twitter
          </label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
            placeholder="https://twitter.com/username"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <div>
          <label htmlFor="github" className="font-medium flex gap-2">
            <span>
              <i className="fa-brands fa-github"></i>
            </span>
            GitHub
          </label>
          <input
            type="text"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            placeholder="https://github.com/username"
            className="w-full p-2 rounded-md border border-gray-400 my-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
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

export default SocialProfileForm;
