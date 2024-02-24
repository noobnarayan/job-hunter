import { useEffect, useState } from "react";
import AboutForm from "./AboutForm";
import SocialProfileForm from "./SocialProfileForm";
import WorkExperienceCard from "./WorkExperienceCard";
import WorkExperienceForm from "./WorkExperienceForm";
import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";
import { useSelector } from "react-redux";
import SkillsSearch from "../Common/SkillsSearch";

function EditProfile() {
  const [showAddWorkExperience, setShowAddWorkExperience] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(new Map());

  const { userData } = useSelector((store) => store.auth);
  const userEducation = userData?.userProfile?.education;
  const userWorkExperience = userData?.userProfile?.workExperience;

  const [workExperienceFormData, setWorkExperienceFormData] = useState(null);
  const [educationFormData, setEducationFormData] = useState(null);

  useEffect(() => {
    // Check if userData and userProfile exist
    if (userData && userData.userProfile && userData.userProfile.skills) {
      // Initialize selectedSkills with userData skills
      const initialSkills = new Map(
        userData.userProfile.skills.map((skill) => [skill, true])
      );
      setSelectedSkills(initialSkills);
    }
  }, [userData]); // Trigger effect when userData changes

  if (!userData) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }
  return (
    <div className="px-4">
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-[30%] flex flex-col gap-2.5">
          <p className="font-medium">About</p>
          <p className="text-gray-400 text-sm">
            Tell us about yourself so companies know who you are.
          </p>
        </div>
        <div className="w-full md:w-[70%] ">
          <AboutForm userData={userData} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-[30%] flex flex-col gap-2.5">
          <p className="font-medium">Social Profiles</p>
          <p className="text-gray-400 text-sm">
            Where can people find you online?
          </p>
        </div>
        <div className="w-full md:w-[70%] ">
          <SocialProfileForm userData={userData} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-[30%] flex flex-col gap-2.5">
          <p className="font-medium">Your work experience</p>
          <p className="text-gray-400 text-sm">
            What other positions have you held?
          </p>
        </div>
        <div className="w-full md:w-[70%] flex flex-col gap-3.5">
          <div className="flex flex-col gap-3">
            {userWorkExperience.length > 0 &&
              userWorkExperience.map((exp, index) => (
                <WorkExperienceCard
                  key={index}
                  exp={exp}
                  setShowAddWorkExperience={setShowAddWorkExperience}
                  setWorkExperienceFormData={setWorkExperienceFormData}
                />
              ))}
          </div>
          {showAddWorkExperience ? (
            <WorkExperienceForm
              setShowAddWorkExperience={setShowAddWorkExperience}
              data={workExperienceFormData}
              setWorkExperienceFormData={setWorkExperienceFormData}
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
        <div className="w-full md:w-[30%] flex flex-col gap-2.5">
          <p className="font-medium">Education</p>
          <p className="text-gray-400 text-sm">
            What schools have you studied at?
          </p>
        </div>
        <div className="w-full md:w-[70%] flex flex-col gap-3.5">
          <div className="flex flex-col gap-3">
            {userEducation.length > 0 &&
              userEducation.map((edu, index) => (
                <EducationCard
                  key={index}
                  edu={edu}
                  setShowAddEducation={setShowAddEducation}
                  setEducationFormData={setEducationFormData}
                />
              ))}
          </div>

          {showAddEducation ? (
            <EducationForm
              setShowAddEducation={setShowAddEducation}
              educationFormData={educationFormData}
              setEducationFormData={setEducationFormData}
            />
          ) : (
            <div
              className="text-sm text-green-600 flex gap-1 items-center hover:cursor-pointer"
              onClick={() => setShowAddEducation(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add education</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-5 border-b pb-10">
        <div className="w-full md:w-[30%] flex flex-col gap-2.5">
          <p className="font-medium">Your Skills</p>
          <p className="text-gray-400 text-sm">
            This will help startups hone in on your strengths.
          </p>
        </div>
        <div className="w-full md:w-[70%] flex flex-col gap-3.5">
          <SkillsSearch
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            profile={true}
          />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
