import React from "react";
import happyPeople from "../assets/media/happy.svg";
import { Link } from "react-router-dom";

function JobSeekers() {
  return (
    <div className="md:flex px-5 md:px-10 py-20 md:py-32 font-Poppins">
      <div className="md:w-1/2">
        <div className="sm:p-20 md:p-0">
          <img src={happyPeople} className=" md:w-11/12" />
        </div>
      </div>

      {/* Right */}
      <div className="md:w-1/2 px-5 md:px-16">
        <div>
          <p className="text-xl font-medium my-10">GOT TALENT?</p>
        </div>
        <div>
          <h3 className="text-4xl font-semibold mr-4 md:mr-20 my-7 ">
            Why job seekers love us
          </h3>
        </div>

        <div className="flex flex-col gap-8 text-left">
          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287fab77e63b3_Star.svg" />
            <p>
              Unique jobs at <span className="font-semibold">startups</span> and
              <span className="font-semibold"> tech companies</span> you can't
              find anywhere else
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d7128775587e63ec_Click.svg" />
            <p>
              Say goodbye to cover letters - your profile is all you need.
              <span className="font-semibold"> One click to apply</span> and
              you're done.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287515d7e63b2_List.svg" />
            <p>
              Everything you need to know to job search - including seeing
              <span className="font-semibold"> salary</span> and
              <span className="font-semibold"> stock options</span> upfront when
              looking
            </p>
          </div>

          <div className=" flex items-center justify-center gap-4">
            <img src="https://assets-global.website-files.com/636dd759d71287e8ac7e6280/636dd759d71287b6b07e63ed_Connect.svg" />
            <p>
              Connect directly with
              <span className="font-semibold"> founders</span> at top startups -
              no third party recruiters allowed
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
    </div>
  );
}

export default JobSeekers;
