import React, { useState } from "react";
import EditProfile from "../components/UserProfile/EditProfile";
import UpdateResume from "../components/UserProfile/UpdateResume";

function UserProfile() {
  const [selectedSection, setSelectedSection] = useState("editProfile");

  const switchSection = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="mt-20 xl:px-28 px-5">
      <div>
        <div>
          <h2 className="font-medium text-4xl">Edit your Jobhunter profile</h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between border-b mt-10 md:items-center pb-3 md:pb-0">
          <div className="flex gap-6 mb-3 md:mb-0 ">
            <div
              className={`hover:cursor-pointer text-gray-600 ${
                selectedSection === "editProfile"
                  ? "text-black border-b-2 border-gray-600"
                  : "hover:border-b-2 hover:border-gray-300"
              } pb-3 hover:text-green-500`}
              onClick={() => switchSection("editProfile")}
            >
              Profile
            </div>
            <div
              className={`hover:cursor-pointer text-gray-600 ${
                selectedSection === "resume"
                  ? "text-black border-b-2 border-gray-600"
                  : "hover:border-b-2 hover:border-gray-300"
              } pb-3 hover:text-green-500`}
              onClick={() => switchSection("resume")}
            >
              Resume / CV
            </div>
          </div>

          <div className="text-sm font-medium text-green-500 hover:cursor-pointer ">
            View public profile
          </div>
        </div>
      </div>
      <div className="border my-5 ">
        {selectedSection === "editProfile" && <EditProfile />}
        {selectedSection === "resume" && <UpdateResume />}
      </div>
    </div>
  );
}

export default UserProfile;
