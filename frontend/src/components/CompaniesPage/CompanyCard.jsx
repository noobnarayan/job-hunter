import React from "react";
import Dot from "../../components/Dot";
import { useNavigate } from "react-router-dom";

function CompanyCard({ bgColor, company }) {
  const {
    companyName,
    companyLogo,
    jobListings,
    companySize,
    companySocialProfiles,
  } = company;

  const navigate = useNavigate();
  const redirectToDetail = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="rounded-xl border border-gray-300 p-1.5">
      <div
        className="rounded-xl border  p-2"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex gap-5 justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="h-14 w-14 border rounded-xl overflow-hidden p-px bg-white ">
              <img src={companyLogo} alt="Company Logo" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-medium text-gray-800">{companyName}</p>
              <span className="text-xs text-gray-500 flex gap-3 items-center ">
                <i className="fa-solid fa-user-group"></i>
                <p>
                  {companySize.from}-{companySize.to} EMPLOYEES
                </p>
              </span>
            </div>
          </div>

          <div className="flex gap-2.5 text-gray-700">
            <a
              href={companySocialProfiles?.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin hover:cursor-pointer text-lg"></i>
            </a>
            <a
              href={companySocialProfiles?.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-twitter hover:cursor-pointer text-lg"></i>
            </a>
            <a
              href={companySocialProfiles?.portfolioWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-globe hover:cursor-pointer text-lg"></i>
            </a>
          </div>
        </div>
        {jobListings.length > 0 && (
          <div className="flex flex-col gap-2 my-5">
            <h3 className="text-sm font-medium border-gray-600 border w-32 flex items-center justify-center rounded-md text-gray-800 bg-green-300">
              Active Listings
            </h3>
            {jobListings?.map((listing, index) => (
              <div
                className="bg-gray-100 rounded-xl px-3 py-1.5 flex gap-3 items-center hover:cursor-pointer"
                key={index}
                onClick={() => redirectToDetail(listing._id)}
              >
                <span className="text-sm font-medium text-gray-900">
                  {listing?.title}
                </span>
                <Dot />
                <span className="text-xs font-medium text-gray-600">
                  {listing?.location}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;
