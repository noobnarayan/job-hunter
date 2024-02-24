import React, { useEffect, useState } from "react";
import InputField from "../Common/FormComponents/InputField";
import SubmissionButton from "../Common/Buttons/SubmissionButton";
import { userService } from "../../services/userService";
import { useSelector } from "react-redux";
import useUpdateUserData from "../../hooks/useUpdateUserData";

function UpdateResume() {
  const [resumeLink, setResumeLink] = useState("");
  const [resume, setResume] = useState("");
  const [updating, setUpdating] = useState(null);

  const updateUserData = useUpdateUserData();

  const { userData } = useSelector((store) => store.auth);

  useEffect(() => {
    if (userData?.userProfile?.resume) {
      setResume(userData?.userProfile?.resume);
    }
  }, [userData]);

  const handleInputChange = (event) => {
    setResumeLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setUpdating(true);
      const res = await userService.updateResume(resumeLink);
      updateUserData();
      setUpdating(false);
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }
    setResumeLink("");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10 sm:px-5 md:px-10 lg:px-20">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <h2 className="mb-5 text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
          Upload your recent resume or CV
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Resume link"
            id="resumeLink"
            value={resumeLink}
            onChange={handleInputChange}
            isRequired={true}
            placeholder="Paste your Google Drive link here"
            description="Please ensure that your Google Drive link is accessible to everyone."
          />

          <div className="flex justify-end my-2">
            <SubmissionButton
              type="submit"
              label={updating ? "Updating..." : "Update"}
              color="black"
            />
          </div>
        </form>

        {resume && (
          <div className="mt-10 p-3 bg-gray-200 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-700">
              Current Resume Link:
            </h3>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline flex items-center my-2 break-all"
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-2.5"></i>
              {resume}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateResume;
