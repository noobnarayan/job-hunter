import React, { useState } from "react";
import { Select, SelectItem } from "@tremor/react";

function SideBarFilter() {
  const [YOE, setYOE] = useState(30);
  const handleExperienceChange = (e) => {
    setYOE(e.target.value);
  };
  return (
    <div>
      <div className="text-sm">
        <div className="border-b px-4">
          <div className="flex justify-between py-4 ">
            <span className=" font-bold">Filter</span>
            <span className=" font-bold text-red-400">Clear all</span>
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
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="full-time"
                    name="full-time"
                    className="form-checkbox h-4 w-4 accent-green-600"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="full-time"
                  >
                    Full-time
                  </label>
                </div>
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="part-time"
                    name="part-time"
                    className="form-checkbox h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="part-time"
                  >
                    Part-time
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="internship"
                    name="internship"
                    className="form-checkbox h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="internship"
                  >
                    Internship
                  </label>
                </div>
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="freelance"
                    name="freelance"
                    className="form-checkbox h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="freelance"
                  >
                    Freelance
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Experience</span>
            </div>
            <div className="relative">
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
                <div className="flex gap-2.5 items-center">
                  <input
                    type="radio"
                    id="full-time"
                    name="job-type"
                    className="form-radio h-4 w-4 accent-green-600"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="full-time"
                  >
                    Under $10000
                  </label>
                </div>
                <div className="flex gap-2.5 items-center">
                  <input
                    type="radio"
                    id="part-time"
                    name="job-type"
                    className="form-radio h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="part-time"
                  >
                    $10000 - $25000
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2.5 items-center">
                  <input
                    type="radio"
                    id="internship"
                    name="job-type"
                    className="form-radio h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="internship"
                  >
                    $25000 - $50000
                  </label>
                </div>
                <div className="flex gap-2.5 items-center">
                  <input
                    type="radio"
                    id="freelance"
                    name="job-type"
                    className="form-radio h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="freelance"
                  >
                    More than $50000
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* On-site/Remote */}
          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Job Type</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="full-time"
                    name="full-time"
                    className="form-checkbox h-4 w-4 accent-green-600"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="full-time"
                  >
                    On-site
                  </label>
                </div>
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="part-time"
                    name="part-time"
                    className="form-checkbox h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="part-time"
                  >
                    Hybrid
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2.5 items-center">
                  <input
                    type="checkbox"
                    id="internship"
                    name="internship"
                    className="form-checkbox h-4 w-4 accent-green-600 "
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="internship"
                  >
                    Remote
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarFilter;
