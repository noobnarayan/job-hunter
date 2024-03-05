import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/userService";

function UserPublicProfile() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const res = await userService.getPublicProfile(id);
      setUserDetails(res);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-[3.5rem]">
      <div className="p-8 bg-white rounded shadow-md w-10/12 mt-7">
        <img
          className="w-24 h-24 mx-auto rounded-full"
          src={userDetails?.userProfile?.profilePicture}
          alt="Profile"
        />
        <h2 className="mt-4 text-2xl font-semibold text-center">
          {userDetails?.userProfile?.name}
        </h2>
        <div className="text-xs font-medium text-gray-600 flex gap-1.5 items-center  justify-center">
          <span>
            {userDetails?.userProfile?.yearsOfExperience || 0} Years of exp
          </span>

          <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
          {userDetails?.userProfile?.address?.country && (
            <span className="capitalize ">
              {userDetails?.userProfile?.address?.country}
            </span>
          )}
        </div>
        <span className="flex gap-3 text-gray-800 justify-center my-2 text-lg hover:cursor-pointer">
          {userDetails?.userProfile?.socialProfiles?.github && (
            <a
              href={userDetails?.userProfile?.socialProfiles?.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-github"></i>
            </a>
          )}
          {userDetails?.userProfile?.socialProfiles?.twitter && (
            <a
              href={userDetails?.userProfile?.socialProfiles?.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-x-twitter"></i>
            </a>
          )}
          {userDetails?.userProfile?.socialProfiles?.portfolioWebsite && (
            <a
              href={userDetails?.userProfile?.socialProfiles?.portfolioWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-globe"></i>
            </a>
          )}
        </span>
        <h3 className="text-center my-2 font-medium text-gray-600">About</h3>
        <p className="mt-2 text-center md:px-10 my-10">
          {userDetails?.userProfile?.bio}
        </p>

        {userDetails?.userProfile?.workExperience.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-medium">Work Experience</h3>

            {userDetails?.userProfile?.workExperience.map((exp, index) => (
              <div
                key={index}
                className="shadow rounded-md p-3 w-full md:w-3/5 my-4 border-b-2 border-gray-200 border"
              >
                <div className="flex gap-5 items-center mb-5">
                  <div className="h-16 w-16 rounded-lg overflow-hidden border p-1.5 flex justify-center items-center">
                    <img src={exp.company.logoUrl} alt="Company Logo" />
                  </div>
                  <div>
                    <p className="font-medium ">{exp.jobTitle}</p>
                    <p className="text-sm text-gray-500">{exp.company.name}</p>
                    <p className="text-sm text-gray-400 font-medium">
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
                {exp.description && (
                  <p className="text-justify text-sm text-gray-800 ">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        {userDetails?.userProfile?.workExperience.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-medium ">Work Experience</h3>
            {userDetails?.userProfile?.education.map((edu) => (
              <div
                key={edu._id}
                className="border p-3.5 border-b-4 bg-gray-50 flex flex-col gap-3 rounded w-full md:w-3/5 my-4"
              >
                <div className="flex justify-between">
                  <div className="flex gap-6 text-sm">
                    <div className="h-12 w-12 overflow-hidden border rounded-md p-px">
                      <img
                        src="https://wellfound.com/images/shared/nopic_college.png"
                        alt="Institution Logo"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{edu.institution}</p>
                      <p className="">
                        {edu.fieldOfStudy}, {edu.degree}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {formatDate(edu.startYear + "-01")} to{" "}
                        {formatDate(edu.endYear + "-01")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {userDetails?.userProfile?.skills.length > 0 && (
          <div>
            <h3 className="text-gray-500 font-medium ">Skills</h3>
            <div className="flex gap-4 flex-wrap my-2">
              {userDetails?.userProfile?.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-200 shadow py-1 px-2 rounded my-1 text-sm font-medium text-gray-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPublicProfile;
