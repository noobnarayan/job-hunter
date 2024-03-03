import React from "react";
import DashboardSidebar from "../components/UserOnboarding/DashboardSidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../components/CompanyDashboard/Dashboard";
import Applications from "../components/CompanyDashboard/Applications";
import Shortlisted from "../components/CompanyDashboard/Shortlisted";
import JobPosting from "./JobPosting";
import { useSelector } from "react-redux";

function CompanyDashboard() {
  const { status, userData } = useSelector((store) => store.auth);
  if (userData.role !== "employer") {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex">
      <aside className="max-w-[64px] xl:w-full xl:max-w-[280px]">
        <DashboardSidebar />
      </aside>
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/shortedlisted" element={<Shortlisted />} />
          <Route path="/post-job" element={<JobPosting />} />
        </Routes>
      </div>
    </div>
  );
}

export default CompanyDashboard;
