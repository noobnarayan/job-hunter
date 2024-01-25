import React from "react";

function JobCard({ job }) {
  const { title, salaryRange, location, type, responsibilities, employer } =
    job;
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

  return (
    <div className="my-4 hover:cursor-pointer">
      <div className="border p-3.5 shadow rounded-lg">
        {/* Top */}
        <div className="mb-5 flex flex-col md:flex-row justify-between gap-5 md:gap-1">
          {/* right */}
          <div className="flex  gap-3">
            <div className="imgdiv h-11 w-11 rounded-lg overflow-hidden flex justify-center items-center border">
              <img src={companyLogo} />
            </div>
            <div className="flex flex-col mb-2 md:mb-0">
              <div className="title">
                <p className="font-bold">{title}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 text-[.9rem]">
                <div className="company">
                  <p className="text-gray-400 font-medium">{companyName}</p>
                </div>
                <div className="flex gap-3 items-center  md:flex-row">
                  <div className="tag bg-[#feefe0] py-px px-2.5 rounded-xl ">
                    <span className="text-orange-500">{type}</span>
                  </div>
                  <div className="strippend">
                    <span className="text-gray-400">
                      ${salaryRange.from}-${salaryRange.to} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* left */}
          <div className="">
            <div className="flex flex-col text-left md:text-right gap-1">
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
