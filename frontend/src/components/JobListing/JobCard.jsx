import React from "react";

function JobCard() {
  return (
    <div className="my-4">
      <div className="border p-3.5 shadow rounded-lg">
        {/* Top */}
        <div className="mb-5 flex justify-between ">
          {/* right */}
          <div className="flex gap-3">
            <div className="imgdiv h-11 w-11 rounded-lg overflow-hidden flex justify-center items-center border">
              <img src="http://localhost:5173/src/components/assets/media/JobHunter.png" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="title">
                <p className="font-bold">Product Designer</p>
              </div>
              <div className="flex gap-3 text-[.9rem]">
                <div className="company">
                  <p className="text-gray-400 font-medium">Gojek</p>
                </div>
                <div className="tag bg-[#feefe0] py-px px-2.5 rounded-xl ">
                  <span className="text-orange-500">Full-time</span>
                </div>
                <div className="strippend">
                  <span className="text-gray-400">$100-$2,OOO USD</span>
                </div>
              </div>
            </div>
          </div>
          {/* left */}
          <div className="">
            <div className="flex flex-col text-right gap-1">
              <div className="flex gap-3 justify-center items-center">
                <i className="fa-solid fa-location-dot"></i>
                <p className="font-medium">Marina East, Singapore</p>
              </div>
              <div className="text-gray-500">
                <p>Posted 5 mins ago</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="ml-10 text-gray-500 text-[.9rem]">
          <ul className="list-disc">
            <li>
              Within this role, you will be creating content for a wide range of
              local and international clients
            </li>
            <li>
              This role is suited to Bali based creatives looking to work
              in-house.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
