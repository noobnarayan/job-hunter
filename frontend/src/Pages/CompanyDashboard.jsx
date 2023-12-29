import React from "react";
import DashboardSidebar from "../components/UserOnboarding/DashboardSidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/CompanyDashboard/Dashboard";
import Applications from "../components/CompanyDashboard/Applications";

function CompanyDashboard() {
  return (
    <div className="flex">
      <aside className="max-w-[64px] xl:w-full xl:max-w-[280px]">
        <DashboardSidebar />
      </aside>
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/applications" element={<Applications />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default CompanyDashboard;
