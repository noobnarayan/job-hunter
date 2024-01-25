import React from "react";
import CheckBoxLabel from "../Common/FormComponents/CheckBoxLabel";

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
            <CheckBoxLabel text={"India"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOnboaring;
