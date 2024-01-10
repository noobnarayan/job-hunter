import React from "react";
import EditProfile from "../components/UserProfile/EditProfile";

function UserProfile() {
  return (
    <div className="mt-20 md:px-28 px-5">
      <div>
        <div>
          <h2 className="font-medium text-4xl">Edit your Jobhunter profile</h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between border-b mt-10 md:items-center pb-3 md:pb-0">
          <div className="flex gap-6 mb-3 md:mb-0 ">
            <div className="hover:cursor-pointer text-gray-600 active:text-black hover:border-b-2 hover:border-gray-300 active:border-gray-600 pb-3 hover:text-green-500">
              Overview
            </div>
            <div className="hover:cursor-pointer text-gray-600 active:text-black hover:border-b-2 hover:border-gray-300 active:border-gray-600 pb-3 hover:text-green-500">
              Profile
            </div>
            <div className="hover:cursor-pointer text-gray-600 active:text-black hover:border-b-2 hover:border-gray-300 active:border-gray-600 pb-3 hover:text-green-500">
              Resume / CV
            </div>
          </div>
          <div className="text-sm font-medium text-green-500 hover:cursor-pointer ">
            View public profile
          </div>
        </div>
      </div>
      <div className="border my-5 ">
        <EditProfile />
      </div>
    </div>
  );
}

export default UserProfile;
