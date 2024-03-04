import React from "react";
import MainJobSection from "../components/JobListing/MainJobSection";
import DisclaimerBanner from "../components/Common/DisclaimerBanner";
function JobListing() {
  return (
    <div className="mt-16">
      <DisclaimerBanner />
      <MainJobSection />
    </div>
  );
}

export default JobListing;
