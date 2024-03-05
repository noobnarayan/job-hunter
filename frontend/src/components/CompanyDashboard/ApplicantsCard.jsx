import React from "react";
import { companyService } from "../../services/companyService";
import { useNavigate } from "react-router-dom";

function ApplicantsCard({ isShortlisted, data, fetchApplications }) {
  const { applicantProfile, jobDetails } = data;
  const {
    profilePicture,
    name,
    bio,
    skills,
    education,
    workExperience,
    address,
    yearsOfExperience,
    resume,
    socialProfiles,
  } = applicantProfile?.userProfile;

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    return `${years} years ${months} months`;
  }

  const removeApplicant = async () => {
    try {
      const res = await companyService.removeApplication({
        jobId: jobDetails._id,
        applicantId: applicantProfile._id,
      });
      console.log(res);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const shortlistCandidate = async () => {
    try {
      const res = await companyService.shortlistCandidate({
        jobId: jobDetails._id,
        applicantId: applicantProfile._id,
      });
      console.log(res);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const removeShortlistedCandidate = async () => {
    try {
      const res = await companyService.removeFromShortlist({
        jobId: jobDetails._id,
        applicantId: applicantProfile._id,
      });
      console.log(res);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const openPublicProfile = () => {
    navigate(`/user/${applicantProfile._id}`);
  };

  return (
    <div className="rounded border shadow py-3.5 px-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row gap-5 ">
          <div className="h-20 md:h-16 rounded-full overflow-hidden flex justify-center">
            <img src={profilePicture} className="h-20 md:h-16 rounded-full" />
          </div>
          <div className="flex flex-col gap-3 md:gap-0">
            <div>
              <h3 className="font-semibold text-xl text-center md:text-left">
                {name}
              </h3>
            </div>
            <div className="text-xs font-medium text-gray-600 flex gap-1.5 items-center flex-col md:flex-row">
              <span>{yearsOfExperience || 0} Years of exp</span>
              <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
              {address?.country && (
                <span className="capitalize">{address?.country} </span>
              )}
            </div>
            <div className="text-xs bg-green-200 px-1.5 py-px rounded-md font-medium text-green-600 my-1.5 flex items-center justify-center cursor-pointer">
              ✅ Applied for: {jobDetails.title}
            </div>
          </div>
        </div>
        <div className="flex gap-3 h-6 items-center justify-center my-2 md:my-0">
          {socialProfiles?.linkedin && (
            <div className="flex justify-center items-center bg-green-200 p-1 rounded hover:cursor-pointer">
              <a href={socialProfiles?.linkedin} target="_blank">
                <i className="fa-brands fa-linkedin-in text-green-600 "></i>
              </a>
            </div>
          )}

          {resume && (
            <div className="flex justify-center items-center bg-green-200 py-1 px-1.5 rounded">
              <span className="text-green-700 text-[0.67rem] lg:text-xs font-semibold hover:cursor-pointer">
                <a href={resume} target="_blank">
                  Resume ✨
                </a>
              </span>
            </div>
          )}

          <div className="flex justify-center items-center bg-green-200 py-1 px-1.5 rounded">
            <span
              className="text-green-700 text-[0.67rem] lg:text-xs font-semibold hover:cursor-pointer"
              onClick={openPublicProfile}
            >
              View profile 👀
            </span>
          </div>
        </div>
      </div>
      <div className="text-sm flex flex-col md:flex-row gap-5 px-3">
        <p
          className="font-semibold text-gray-600 underline text-center md:text-left text-base md:text-sm
        "
        >
          Bio
        </p>
        <p>{bio}</p>
      </div>
      <div>
        <div className="flex flex-col gap-3.5">
          {workExperience?.length > 0 && (
            <>
              <p className="text-gray-500 text-sm">Experience</p>
              {workExperience.map((exp, index) => (
                <div className="flex gap-4 md:pl-2" key={index}>
                  <div className="h-11 rounded-lg overflow-hidden border p-1 flex justify-center items-center">
                    <img
                      src={
                        exp.company.logoUrl ||
                        "https://photos.wellfound.com/startups/i/267839-22e9550a168c9834c67a3e55e2577688-medium_jpg.jpg?buster=1677467708"
                      }
                      className="h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-0">
                    <p className="font-medium text-sm">{exp.jobTitle}</p>
                    <p className="text-xs text-gray-500">{exp.company.name}</p>
                    <p className="text-xs text-gray-400 font-medium">
                      {exp.startMonth && exp.endMonth
                        ? `${formatDate(exp.startMonth)} to ${formatDate(
                            exp.endMonth
                          )} - ${calculateDuration(
                            exp.startMonth,
                            exp.endMonth
                          )}`
                        : null}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="my-2 flex flex-col gap-2.5 md:gap-1">
          {education?.length > 0 && (
            <>
              <p className="text-gray-500 text-sm my-2">Education</p>
              {education?.map((edu, index) => (
                <div className="text-xs font-medium md:pl-2" key={index}>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                    <p>
                      {edu?.degree}, {edu?.fieldOfStudy}
                    </p>
                    <div className="h-1.5 w-1.5 bg-gray-600 rounded-full hidden md:block"></div>
                    <p className="text-gray-400">
                      {edu.startYear && edu.endYear
                        ? `${new Date(
                            edu.startYear
                          ).getFullYear()} - ${new Date(
                            edu.endYear
                          ).getFullYear()}`
                        : null}
                    </p>
                  </div>
                  <p className="text-gray-500 my-1">{edu?.institution}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3.5 justify-end">
        {isShortlisted ? (
          <>
            <button
              className="p-2 px-4 font-medium text-xs rounded-md bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 flex items-center justify-center"
              onClick={removeShortlistedCandidate}
            >
              ❌ Remove from shortlist
            </button>
            <button className="p-2 px-4 font-medium text-xs rounded-md bg-black text-white hover:bg-gray-800 hover:text-white flex items-center justify-center">
              💬 Request to chat
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 px-4 font-medium text-xs rounded-md bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 flex items-center justify-center"
              onClick={removeApplicant}
            >
              ❌ Not interested
            </button>
            <button
              className="p-2 px-4 font-medium text-xs rounded-md bg-black text-white hover:bg-gray-800 hover:text-white flex items-center justify-center"
              onClick={shortlistCandidate}
            >
              🔖 Shortlist
            </button>
            <button className="p-2 px-4 font-medium text-xs rounded-md bg-black text-white hover:bg-gray-800 hover:text-white flex items-center justify-center">
              💬 Request to chat
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ApplicantsCard;
