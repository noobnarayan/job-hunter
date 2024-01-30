import React, { useState } from "react";
import { Select, SelectItem } from "@tremor/react";
import Checkbox from "../Common/FormComponents/Checkbox";
import RadioButton from "../Common/FormComponents/RadioButton";

function SideBarFilter() {
  const [YOE, setYOE] = useState(30);
  const handleExperienceChange = (e) => {
    setYOE(e.target.value);
  };
  const handleInputChange = (e) => {};

  return (
    <div>
      <div className="text-sm">
        <div className="border-b px-4">
          <div className="flex justify-between py-4 ">
            <span className=" font-bold">Filter</span>
            <span className=" font-bold text-red-400 hover:cursor-pointer">
              Clear all
            </span>
          </div>
        </div>

        <div className="px-4">
          <div>
            <div className="py-4">
              <span className="font-bold">Date Post</span>
            </div>
            <div className="max-w-sm mx-auto space-y-6 border-b pb-4">
              <Select>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this_week">This week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
              </Select>
            </div>
          </div>
          {/* Job Type */}
          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Job Type</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Checkbox
                  label="Full-time"
                  name="full-time"
                  className={"text-gray-500 text-sm font-medium"}
                />
                <Checkbox
                  label="Part-time"
                  name="part-time"
                  className={"text-gray-500 text-sm font-medium"}
                />
              </div>
              <div className="flex justify-between">
                <Checkbox
                  label="Internship"
                  name="internship"
                  className={"text-gray-500 text-sm font-medium"}
                />
                <Checkbox
                  label="Freelance"
                  name="freelance"
                  className={"text-gray-500 text-sm font-medium"}
                />
              </div>
            </div>
          </div>
          {/* Experience */}
          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Experience</span>
            </div>
            <div className=" ">
              <input
                type="range"
                min="0"
                max="30"
                onChange={(e) => handleExperienceChange(e)}
                className="slider h-2 w-full rounded-full accent-green-600 outline-none transition-colors duration-150 ease-linear cursor-pointer"
              />
            </div>
            <div className="flex justify-between px-1 text-gray-500 font-medium">
              <span>0 Yrs</span>
              <span className="font-bold text-green-600">{YOE} Yrs</span>
              <span>30 Yrs</span>
            </div>
          </div>
          {/* Salary Range */}
          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Salary Range</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <RadioButton
                  id="under-3LPA"
                  name="salary-range"
                  value="Under ₹3 LPA"
                  label="Under ₹3 LPA"
                  className="text-gray-500 text-sm font-medium"
                />
                <RadioButton
                  id="3-6LPA"
                  name="salary-range"
                  value="₹3 LPA - ₹6 LPA"
                  label="₹3 LPA - ₹6 LPA"
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
              <div className="flex justify-between">
                <RadioButton
                  id="6-10LPA"
                  name="salary-range"
                  value="₹6 LPA - ₹10 LPA"
                  label="₹6 LPA - ₹10 LPA"
                  className="text-gray-500 text-sm font-medium"
                />
                <RadioButton
                  id="10-15LPA"
                  name="salary-range"
                  value="₹10 LPA - ₹15 LPA"
                  label="₹10 LPA - ₹15 LPA"
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
              <div className="flex justify-between">
                <RadioButton
                  id="15-20LPA"
                  name="salary-range"
                  value="₹15 LPA - ₹20 LPA"
                  label="₹15 LPA - ₹20 LPA"
                  className="text-gray-500 text-sm font-medium"
                />
                <RadioButton
                  id="more-than-20LPA"
                  name="salary-range"
                  value="More than ₹20 LPA"
                  label="More than ₹20 LPA"
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>
          {/* On-site/Remote */}
          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Work Mode</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Checkbox
                  label="On-site"
                  name="full-time"
                  className="text-gray-500 text-sm font-medium"
                />
                <Checkbox
                  label="Hybrid"
                  name="part-time"
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
              <div className="flex justify-between">
                <Checkbox
                  label="Remote"
                  name="internship"
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarFilter;
