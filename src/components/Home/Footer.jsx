import React from "react";
import logo from "./assets/media/logo.png";
function Footer() {
  return (
    <div className="flex justify-between py-12 border-t border-gray-300  ">
      <div className="w-2/5 ml-20 flex flex-col gap-2">
        <img src={logo} className="w-3/6" />
        <div className=" flex gap-3 text-2xl ml-3.5 text-gray-800">
          <i class="fa-brands fa-twitter cursor-pointer hover:text-green-500"></i>
          <i class="fa-brands fa-instagram cursor-pointer hover:text-green-500"></i>
          <i class="fa-brands fa-linkedin-in cursor-pointer hover:text-green-500"></i>
        </div>
      </div>
      <div className="flex justify-between w-3/5 ">
        <div className="flex flex-col gap-2.5">
          <h3 className="font-semibold text-base">For Candidates</h3>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Overview
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Startup Jobs
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Web3 Jobs
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Featured
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Startup Hiring Data
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Tech Startups
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Remote
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="font-semibold text-base    ">For Recruiters</h3>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Overview
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Recruit Pro
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Curated
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            RecruiterCloud
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Hire Developers
          </p>
          <p className=" cursor-pointer hover:underline hover:text-green-600">
            Pricing
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="font-semibold text-base">Company</h3>
          <p className="cursor-pointer hover:underline hover:text-green-600">
            About
          </p>
          <p className="cursor-pointer hover:underline hover:text-green-600">
            AngelList Venture
          </p>
          <p className="cursor-pointer hover:underline hover:text-green-600">
            Blog
          </p>
          <p className="cursor-pointer hover:underline hover:text-green-600">
            Terms & Risks
          </p>
          <p className="cursor-pointer hover:underline hover:text-green-600">
            Privacy & Cookies
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Footer;
