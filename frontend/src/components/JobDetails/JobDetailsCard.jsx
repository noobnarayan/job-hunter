import React from "react";

function JobDetailsCard() {
  return (
    <div className="flex flex-col gap-6 border p-4 rounded-3xl shadow">
      <div className="flex justify-between border-b pb-5">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xl font-medium">Inside Sales Executive </p>
            <p className="text-sm text-gray-600">
              Shining Stars Institution & travels
            </p>
          </div>
          <div className="text-gray-500 text-sm flex flex-col gap-2">
            <div className="flex gap-5 ">
              <div className="flex gap-3">
                <span>
                  <i className="fa-solid fa-briefcase"></i>
                </span>
                <span>1 - 5 years</span>
              </div>
              <div className="flex gap-3">
                <span>
                  <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                </span>
                <span>Not Disclosed</span>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <span>
                  <i className="fa-solid fa-location-dot"></i>{" "}
                </span>
                <span>Noida,Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-20 w-20 rounded-3xl border overflow-hidden flex justify-center items-center">
            <img src="https://img.naukri.com/logo_images/v3/302585.gif" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-3 ">
          <div className="font-light">
            Posted: <span className="font-medium"> 7 days ago </span>
          </div>
          <div className="font-light">
            Openings: <span className="font-medium"> 10</span>
          </div>
          <div className="font-light">
            Applicants: <span className="font-medium"> 3580</span>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="border border-green-600 h-10 w-20 rounded-3xl text-green-600 font-medium">
            Save
          </button>
          <button className="h-10 w-20 rounded-3xl bg-green-600 text-white font-medium">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsCard;
