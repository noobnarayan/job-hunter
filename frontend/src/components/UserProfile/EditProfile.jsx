import { useState } from "react";
import AboutForm from "./AboutForm";
import SocialProfileForm from "./SocialProfileForm";
import WorkExperienceCard from "./WorkExperienceCard";
import WorkExperienceForm from "./WorkExperienceForm";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";

function EditProfile() {
  const [showAddWorkExperience, setShowAddWorkExperience] = useState(false);

  return (
    <div className="px-4">
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">About</p>
          <p className="text-gray-400 text-sm">
            Tell us about yourself so companies know who you are.
          </p>
        </div>
        <div className="w-full md:w-3/5 ">
          <AboutForm />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">Social Profiles</p>
          <p className="text-gray-400 text-sm">
            Where can people find you online?
          </p>
        </div>
        <div className="w-full md:w-3/5 ">
          <SocialProfileForm />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">Your work experience</p>
          <p className="text-gray-400 text-sm">
            What other positions have you held?
          </p>
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-3.5">
          <div className="flex flex-col gap-3">
            <WorkExperienceCard />
            <WorkExperienceCard />
          </div>
          {showAddWorkExperience ? (
            <WorkExperienceForm
              setShowAddWorkExperience={setShowAddWorkExperience}
            />
          ) : (
            <div
              className="text-sm text-green-600 flex gap-1 items-center hover:cursor-pointer"
              onClick={() => setShowAddWorkExperience(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add work experience</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">Your work experience</p>
          <p className="text-gray-400 text-sm">
            What other positions have you held?
          </p>
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-3.5">
          <div className="flex flex-col gap-3">
            <EducationCard />
            <EducationCard />
          </div>
          {showAddWorkExperience ? (
            <EducationForm />
          ) : (
            <div
              className="text-sm text-green-600 flex gap-1 items-center hover:cursor-pointer"
              onClick={() => setShowAddWorkExperience(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add education</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
