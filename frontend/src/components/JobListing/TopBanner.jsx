import React from "react";
import JobOffers from "./assets/media/jobOffers.svg";

function TopBanner() {
  return (
    <div className="bg-blue-50 px-5 md:px-10 pt-5 flex">
      <div className="flex flex-col gap-3">
        <h2 className=" text-3xl font-bold md:text-4xl">Find your dream job</h2>
        <p className=" text-gray-500">
          Looking for jobs? Browse out latest job openings to view and apply to
          the best jobs today!
        </p>
      </div>
      <div className=" overflow-hidden ml-16 h-full">
        <img
          src={JobOffers}
          className="h-auto hidden  md:block md:w-full md:overflow-hidden md:ml-5 md:object-cover"
        />
      </div>
    </div>
  );
}

export default TopBanner;
