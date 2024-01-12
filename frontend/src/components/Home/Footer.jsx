import React from "react";
import logo from "./assets/media/logo.png";
function Footer() {
  return (
    <div className="md:flex justify-between py-12 border-t border-gray-300  ">
      <div className="md:w-2/5 ml-6 md:ml-20 flex flex-col gap-2 py-4 md:py-0">
        <img src={logo} className="w-3/5 md:w-3/6" />
        <div className=" flex gap-3 text-2xl ml-3.5 text-gray-800">
          <i className="fa-brands fa-twitter cursor-pointer hover:text-green-500"></i>
          <i className="fa-brands fa-instagram cursor-pointer hover:text-green-500"></i>
          <i className="fa-brands fa-linkedin-in cursor-pointer hover:text-green-500"></i>
        </div>
      </div>
      <div className="md:flex justify-between md:w-3/5 px-10 md:px-0">
        <div className="flex flex-col gap-2.5 py-5 md:py-0">
          <h3 className="font-semibold md:text-base text-xl">For Candidates</h3>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Overview
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Startup Jobs
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Web3 Jobs
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Featured
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Startup Hiring Data
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Tech Startups
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Remote
          </p>
        </div>
        <div className="flex flex-col gap-2.5 py-5 md:py-0">
          <h3 className="font-semibold md:text-base text-xl    ">
            For Recruiters
          </h3>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Overview
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Recruit Pro
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Curated
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            RecruiterCloud
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Hire Developers
          </p>
          <p className=" cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Pricing
          </p>
        </div>
        <div className="flex flex-col gap-2.5 py-5 md:py-0">
          <h3 className="font-semibold md:text-base text-xl">Company</h3>
          <p className="cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            About
          </p>
          <p className="cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            AngelList Venture
          </p>
          <p className="cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Blog
          </p>
          <p className="cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Terms & Risks
          </p>
          <p className="cursor-pointer text-lg md:text-base hover:underline hover:text-green-600">
            Privacy & Cookies
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Footer;
