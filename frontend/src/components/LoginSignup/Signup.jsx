import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/media/JobHunter.png";

function Signup() {
  return (
    <div>
      <div className="hidden font-semibold text-xl cursor-pointer md:flex items-center text-gray-800 px-16 mt-3">
        <Link to="/" className="flex items-center font-Poppins">
          <img
            src={logo}
            className="w-10 rounded-lg mr-3"
            alt="JobHunter Logo"
          />
          / jobhunter
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-3/6 sm:h-screen flex items-center justify-center sm:pt-5 sm:pl-5 md:w-3/5 lg:pl-16 lg:pt-5">
          <div className="h-full w-full sm:text-right sm:pr-12 bg-black sm:pt-24 sm:pl-14 text-green-500 sm:rounded-t-lg lg:pt-44">
            <h2 className="py-4 text-xl text-center sm:text-5xl sm:text-right font-bold sm:mb-5 sm:pl-4 xl:text-6xl ">
              Find the job made for you.
            </h2>
            <p className="hidden sm:block font-light sm:pl-3 sm:text-lg text-white xl:text-xl xl:pl-16">
              Browse over 130K jobs at top companies and fast-growing startups.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-3/6 pt-1.5 md:w-2/5">
          <div className="p-3 sm:p-10 ">
            <h2 className=" text-3xl font-bold ">Create Account</h2>
            <p className="mt-3">Find your next opportunity!</p>
            <form className="mt-3">
              <div className="flex flex-col">
                <label className=" font-semibold">Full Name:</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded h-10 text-base pl-5 mb-3 border-x border-y border-gray-400"
                  placeholder="enter name"
                />

                <label className=" font-semibold">Email Address:</label>
                <input
                  type="text"
                  name="email"
                  required
                  className="rounded h-10 text-base pl-5 mb-3 border-x border-y border-gray-400"
                  placeholder="user@mail.com"
                />

                <label className=" font-semibold ">Password:</label>
                <input
                  type="text"
                  name="password"
                  required
                  className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
                  placeholder="min 8 characters"
                />

                <label className=" font-semibold">Confirm Password:</label>
                <input
                  type="text"
                  name="password"
                  required
                  className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
                  placeholder="confirm password"
                />

                <button
                  type="submit"
                  className="bg-black rounded-md text-white font-normal text-sm h-11 mt-3"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div>
              <div className="flex items-center justify-center gap-5 my-4">
                <div className="bg-gray-400 h-px w-1/4"></div>
                <p className=" text-gray-400 text-sm">or Login with Email</p>
                <div className="bg-gray-400 h-px w-1/4"></div>
              </div>
              <button className="px-10 items-center justify-center gap-2 flex h-11 rounded-md text-black text-sm w-full border-x border-y border-gray-400">
                <img
                  className="w-10 p-1"
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  alt="Google Sign-In"
                />
                <span className="text-black font-normal">
                  Sign in with Google
                </span>
              </button>
            </div>
            <div className="mt-3">
              <p className=" cursor-pointer text-center">
                Already have an account?
                <Link to="/login" className="underline pl-1">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;