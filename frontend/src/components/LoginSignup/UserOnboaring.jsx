import React from "react";

function UserOnboaring() {
  return (
    <div className="mt-[3.8rem] h-screen bg-[#ebeff5] flex flex-col items-center ">
      <div>
        <div className="py-10 flex flex-col justify-center items-center gap-5">
          <h2 className="font-semibold text-5xl text-gray-950">
            Create your profile
          </h2>
          <p className="text-lg text-gray-950">
            Apply privately to thousands of tech companies & startups with one
            profile.
          </p>
        </div>
      </div>
      <div className="bg-white w-4/6 rounded-xl p-5">
        <div>
          <p className="font-medium">
            <span className="text-green-500 mr-1">*</span>Where are you based?
          </p>
          <div className="pl-3 flex flex-col gap-2">
            <p className="text-xs mt-1 text-gray-400">
              Tip: You can choose a city, state, or country
            </p>
            <div className="bg-green-500 flex gap-2 py-1 px-2.5 text-white w-fit items-center justify-center rounded-3xl  ">
              <i class="fa-solid fa-circle-check text-white"></i>
              <span className="text-sm font-medium">India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOnboaring;
