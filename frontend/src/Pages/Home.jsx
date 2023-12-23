import React from "react";
import LogoSlider from "../components/Home/LogoSlider";
import JobSeekers from "../components/Home/JobSeekers";
import Hero from "../components/Home/Hero";
import HomeStats from "../components/Home/HomeStats";
import HomeRecruiters from "../components/Home/HomeRecruiters";
import Footer from "../components/Home/Footer";

function Home() {
  return (
    <div className="font-Poppins justify-center items-center">
      <Hero />
      <HomeStats />
      <LogoSlider />
      <JobSeekers />
      <HomeRecruiters />
      <Footer />
    </div>
  );
}

export default Home;
