import React from "react";
import DashboardSidebar from "../components/UserOnboarding/DashboardSidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/CompanyDashboard/Dashboard";
import Applications from "../components/CompanyDashboard/Applications";
import Shortlisted from "../components/CompanyDashboard/Shortlisted";
import JobPosting from "./JobPosting";

function CompanyDashboard() {
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
