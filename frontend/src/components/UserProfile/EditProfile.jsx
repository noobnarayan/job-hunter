import AboutForm from "./AboutForm";
import SocialProfileForm from "./SocialProfileForm";
import WorkExperienceCard from "./WorkExperienceCard";
import WorkExperienceForm from "./WorkExperienceForm";

function EditProfile() {
  return (
    <div className="px-4">
      <div className="flex gap-16 my-5 border-b pb-10">
        <div className="w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">About</p>
          <p className="text-gray-400 text-sm">
            Tell us about yourself so companies know who you are.
          </p>
        </div>
        <div className="w-3/5 ">
          <AboutForm />
        </div>
      </div>
      <div className="flex gap-16 my-5 border-b pb-10">
        <div className="w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">Social Profiles</p>
          <p className="text-gray-400 text-sm">
            Where can people find you online?
          </p>
        </div>
        <div className="w-3/5 ">
          <SocialProfileForm />
        </div>
      </div>
      <div className="flex gap-16 my-5 border-b pb-10">
        <div className="w-2/5 flex flex-col gap-2.5">
          <p className="font-medium">Your work experience</p>
          <p className="text-gray-400 text-sm">
            What other positions have you held?
          </p>
        </div>
        <div className="w-3/5 flex flex-col gap-3.5">
          <div className="flex flex-col gap-3">
            <WorkExperienceCard />
            <WorkExperienceCard />
          </div>

          <WorkExperienceForm />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
