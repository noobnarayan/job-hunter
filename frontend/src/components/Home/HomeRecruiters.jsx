import React from "react";
import happyPeople from "../assets/media/happyRecruiters.svg";
import { Link } from "react-router-dom";

function HomeRecruiters() {
  return (
    <div className="md:flex px-7 md:px-10 py-8 font-Poppins">
      <div className="md:w-1/2 px-3 md:px-16">
        <div>
          <p className="text-xl font-medium">NEED TALENT?</p>
        </div>
        <div>
          <h3 className="text-4xl font-semibold md:mr-28 my-7">
            Why recruiters love us
          </h3>
        </div>

        <div className="flex flex-col gap-8 text-left">
          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d7128716b37e63bb_Team.svg" />
            <p>
              <span className="font-semibold">8 million </span>
              responsive and startup-ready candidates, with all the information
              you need to vet them
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d7128708fd7e63b6_Settings.svg" />
            <p>
              Everything you need to kickstart your recruiting - get job posts,
              company branding, and HR tools set up within
              <span className="font-semibold"> 10 minutes, for free</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287316a7e63c1_Template.svg" />
            <p>
              A free
              <span className="font-semibold">applicant tracking system,</span>
              or free integration with any ATS you may already use
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p>
              Plus, we can do the vetting for you! With <u>Curated</u>, we
              review the world's top tech talent and highlight candidates
              directly to you 2x a week.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="my-10">
          <Link to="/login">
            <button className="border border-gray-300 text-black font-medium py-2 px-5 rounded-xl md:shadow hover:bg-green-300 hover:border-green-500 duration-500 mr-5 md:hover:scale-105">
              Learn more
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-black text-white font-medium py-2 px-5 rounded-xl  hover:bg-green-700 duration-500 md:hover:scale-105 md:shadow">
              Sign up now
            </button>
          </Link>
        </div>
      </div>
      {/* Right */}

      <div className="md:w-1/2">
        <div className="sm:p-20 md:p-0">
          <img src={happyPeople} className="md:w-11/12" />
        </div>
      </div>
    </div>
  );
}

export default HomeRecruiters;
