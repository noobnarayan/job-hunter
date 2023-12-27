import React from "react";

function SimilerJobCard() {
  return (
    <div className="border-b pb-3">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Inside Sales Executive </p>
            <p className="text-[.78rem] font-medium text-gray-500">
              Shining Stars Institution & travels
            </p>
          </div>
          <div>
            <div>
              <div className="flex gap-3 text-sm text-gray-600">
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>Noida,Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-end">
          <div className="h-14 w-14 rounded-3xl border overflow-hidden flex justify-center items-center">
            <img src="https://img.naukri.com/logo_images/v3/302585.gif" />
          </div>
          <div>
            <span className="text-xs font-light">Posted 1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimilerJobCard;
