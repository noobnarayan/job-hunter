import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../components/LoginSignup/Login";
import Signup from "../components/LoginSignup/Signup";
import JobListing from "../Pages/JobListing";
import JobDetails from "../Pages/JobDetails";
import CompaniesPage from "../Pages/CompaniesPage";
import CompanyDashboard from "../Pages/CompanyDashboard";
import UserProfile from "../Pages/UserProfile";
import JobPosting from "../Pages/JobPosting";
import ApplicantInformation from "../Pages/ApplicantInformation";
import UserOnboaring from "../components/LoginSignup/UserOnboaring";
import CompanyOnboarding from "../components/LoginSignup/CompanyOnboarding";
import NotFound from "../components/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import SavedJobs from "../Pages/SavedJobs";
import UserPublicProfile from "../Pages/UserPublicProfile";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<JobListing />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/user/:id" element={<UserPublicProfile />} />

      <Route
        path="/dashboard/*"
        element={
          <PrivateRoutes>
            <CompanyDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/post-new-job"
        element={
          <PrivateRoutes>
            <JobPosting />
          </PrivateRoutes>
        }
      />
      <Route
        path="/applicant"
        element={
          <PrivateRoutes>
            <ApplicantInformation />
          </PrivateRoutes>
        }
      />
      <Route path="/user-onboarding" element={<UserOnboaring />} />
      <Route path="/company-onboarding" element={<CompanyOnboarding />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;
