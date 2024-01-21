import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/LoginSignup/Login";
import Signup from "../components/LoginSignup/Signup";
import JobListing from "../pages/JobListing";
import JobDetails from "../pages/JobDetails";
import CompaniesPage from "../pages/CompaniesPage";
import CompanyDashboard from "../pages/CompanyDashboard";
import UserProfile from "../pages/UserProfile";
import JobPosting from "../pages/JobPosting";
import ApplicantInformation from "../pages/ApplicantInformation";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<JobListing />} />
      <Route path="/job-description" element={<JobDetails />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/dashboard" element={<CompanyDashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/post-new-job" element={<JobPosting />} />
      <Route path="/applicant" element={<ApplicantInformation />} />
    </Routes>
  );
}

export default AllRoutes;
