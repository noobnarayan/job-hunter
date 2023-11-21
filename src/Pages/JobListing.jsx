import React from "react";
import Navbar from "../components/Navbar";
import TopBanner from "../components/JobListing/TopBanner";
import MainJobSection from "../components/JobListing/MainJobSection";
function JobListing() {
  return (
    <div>
      <Navbar />
      <TopBanner />
      {/* <MainJobSection />   */}
    </div>
  );
}

export default JobListing;
