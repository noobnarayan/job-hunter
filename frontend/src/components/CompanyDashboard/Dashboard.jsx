import React from "react";
import DashboardAreaChart from "./DashboardAreaChart";
import DashBoardDonutChart from "./DashBoardDonutChart";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="px-5">
      <div className="flex flex-wrap justify-between px-5 gap-2 my-8">
        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-green-400 flex justify-center items-center text-white">
            <i className="fa-solid fa-briefcase"></i>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">124</p>
            <p className="text-xs text-gray-500">Job Postings</p>
          </div>
          <i className="fa-solid fa-angle-right text-2xl text-gray-700"></i>
        </div>

        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-blue-400 flex justify-center items-center text-white">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">124</p>
            <p className="text-xs text-gray-500">New Applications</p>
          </div>
          <i className="fa-solid fa-angle-right text-2xl text-gray-700"></i>
        </div>
        <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center hover:cursor-pointer">
          <div className="rounded-full h-10 w-10 p-2 bg-yellow-400 flex justify-center items-center text-white">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </div>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold text-lg">124</p>
            <p className="text-xs text-gray-500">Closed Jobs</p>
          </div>
          <i className="fa-solid fa-angle-right text-2xl text-gray-700"></i>
        </div>

        <Link to="/dashboard/post-job">
          <div className="h-16 w-56 rounded-xl border shadow flex gap-5 items-center justify-center bg-[#080b0b] hover:cursor-pointer">
            <div className="rounded-full h-10 w-10 p-2 bg-white flex justify-center items-center text-black">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="flex flex-col justify-center ">
              <p className="font-semibold text-lg text-white">Post a Job</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row  gap-3">
        <div className="w-full md:w-4/6">
          <DashboardAreaChart />
        </div>
        <div className="w-full md:w-2/6 flex flex-col gap-5 ">
          <div>
            <DashBoardDonutChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
