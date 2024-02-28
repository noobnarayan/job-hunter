import React from "react";
import { Link } from "react-router-dom";
import heroImage from "./assets/media/heroImage.png";

function Hero() {
  return (
    <div className="md:flex ">
      <div className=" md:w-1/2 bg-gray-200 ">
        <div className="flex flex-col pt-28 pl-8 md:pl-20 gap-6">
          <p className=" font-semibold">_/ Get Hired</p>
          <div className="flex flex-col gap-4">
            <h2 className=" text-5xl font-bold">The Quickest way</h2>
            <h2 className=" text-5xl font-bold">to Hire!</h2>
          </div>
          <p className="font-medium text-gray-700 pr-10 md:pr-32">
            We'll help you find{" "}
            <span className="font-semibold text-gray-900">
              Great Opportunities
            </span>
            , Receive your top new job matches directly in your inbox.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-9 md:gap-14 items-center mt-10 md:mt-8 md:pl-20 pl-0">
          <Link to={"/signup"}>
            {
              <button className="py-3 px-5 border-2 border-black font-semibold text-gray-900 hover:scale-105 shadow-heroButton duration-150">
                Join Our Platform{" "}
                <span className="ml-6">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </button>
            }
          </Link>
          <p className="underline font-semibold text-gray-900">
            <a href="#">Download App</a>
          </p>
        </div>
        <div className="mt-24 flex gap-8 items-center md:items-end justify-center md:justify-normal md:pl-20 pl-14 pb-9 md:pb-0 px-5 md:px-0 md:pt-5">
          <div className="py-3.5 w-20 border-2 border-black font-semibold text-gray-900 hover:scale-105 shadow-heroBox flex justify-center items-center">
            <i className="fa-regular fa-star text-4xl text-black"></i>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-semibold">1.4 Million</p>
            <p className=" text-sm font-medium text-gray-700">
              Candidate Placed to Top Companies
            </p>
          </div>
        </div>
      </div>
      <div className=" hidden md:w-1/2 bg-green-500 md:flex items-center justify-center overflow-hidden">
        <img src={heroImage} className="w-11/12 ml-16 md:pt-44 " />
      </div>
    </div>
  );
}

export default Hero;
