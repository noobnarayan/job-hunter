import React from "react";

function HomeStats() {
  return (
    <div className="px-10 pt-10">
      <div className="grid md:grid-cols-3">
        <div className="flex flex-col gap-1 md:border border-gray-300 border-l-transparent justify-center items-center text-red-500 font-semibold text-3xl md:text-4xl py-10 md:py-16">
          130K +<span className="text-base md:text-2xl">Tech Jobs</span>
        </div>

        <div className="flex flex-col gap-1 md:border border-gray-300 border-l-transparent border-r-transparent justify-center items-center text-pink-600 font-semibold text-3xl md:text-4xl py-10 md:py-16">
          6,000,000 <span className="text-base md:text-2xl">Matches Made </span>
        </div>
        <div className="flex flex-col gap-1 md:border border-gray-300 border-r-transparent justify-center items-center text-purple-800 font-semibold text-3xl md:text-4xl py-16">
          8M +{" "}
          <span className="text-base md:text-2xl">
            Startup-ready candidates
          </span>
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-1 md:border border-gray-300 border-l-transparent border-b-transparent justify-center items-center text-yellow-600 font-semibold text-3xl md:text-4xl py-10 md:py-16">
          27K +<span className="text-base md:text-2xl">Companies</span>
        </div>
        <div className="flex flex-col gap-1 md:border border-gray-300 border-r-transparent border-b-transparent   justify-center items-center text-orange-500 font-semibold text-3xl md:text-4xl py-10 md:py-16">
          1.4M+ <span className="text-base md:text-2xl">Hires </span>
        </div>
      </div>
    </div>
  );
}

export default HomeStats;
