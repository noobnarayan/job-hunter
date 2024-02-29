import React from "react";
import Dot from "../Dot";

function JobCard({ job, redirectToDetail }) {
  const {
    title,
    salaryRange,
    location,
    type,
    responsibilities,
    employer,
    _id,
  } = job;
  const { companyLogo, companyName } = employer.userProfile;

  const datePosted = new Date(job.datePosted);

  const now = new Date();

  const diffTime = Math.abs(now - datePosted);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));

  let timeAgo;

  if (diffMinutes < 60) {
    timeAgo = diffMinutes + " minutes ago";
  } else if (diffHours < 24) {
    timeAgo = diffHours + " hours ago";
  } else if (diffDays < 30) {
    timeAgo = diffDays + " days ago";
  } else {
    timeAgo = diffMonths + " months ago";
  }

  let color, bgColor;
  switch (type) {
    case "Full-time":
      color = "text-orange-500";
      bgColor = "bg-orange-100";
      break;
    case "Part-time":
      color = "text-yellow-700";
      bgColor = "bg-yellow-200";
      break;
    case "Internship":
      color = "text-purple-600";
      bgColor = "bg-purple-200";
      break;
    case "Freelance":
      color = "text-indigo-600";
      bgColor = "bg-indigo-200";
      break;
    default:
      color = "text-gray-700";
      bgColor = "bg-gray-200";
  }

  return (
    <div
      className="my-4 hover:cursor-pointer"
      onClick={() => redirectToDetail(_id)}
    >
      <div className="border p-3.5 shadow rounded-lg">
        {/* Top */}
        <div className="mb-2 md:mb-5 flex flex-col md:flex-row justify-between gap-5 md:gap-1">
          {/* right */}
          <div className="flex  gap-3">
            <div className="imgdiv h-11 w-11 rounded-lg overflow-hidden flex justify-center items-center border">
              <img src={companyLogo} />
            </div>
            <div className="flex flex-col mb-2 md:mb-0">
              <div className="title">
                <p className="font-bold">{title}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 text-[.9rem] mt-1">
                <div className="company">
                  <p className="text-gray-400 font-medium text-sm">
                    {companyName}
                  </p>
                </div>
                <div className="hidden md:flex justify-center items-center">
                  <Dot />
                </div>

                <div className="flex gap-3 items-center  md:flex-row text-xs md:text-sm">
                  <div className={`tag py-px px-2.5 rounded-xl ${bgColor}`}>
                    <span className={color}>{type}</span>
                  </div>
                  <Dot />
                  <div className="strippend">
                    <span className="text-gray-400">
                      ₹ {salaryRange.from}-₹ {salaryRange.to} INR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* left */}
          <div className="">
            <div className="flex  gap-5 md:flex-col text-left md:text-right md:gap-1 text-xs md:text-base">
              <div className="flex gap-3 justify-start md:justify-center items-center">
                <i className="fa-solid fa-location-dot"></i>
                <p className="font-medium">{location}</p>
              </div>
              <div className="text-gray-500">
                <p>{timeAgo}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="ml-5 md:ml-10 text-gray-500 text-[.9rem]">
          <ul className="list-disc">
            <li>{responsibilities[0]}</li>
            <li>{responsibilities[1]}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
