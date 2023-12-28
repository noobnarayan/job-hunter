import React from "react";
import CompanyCard from "../components/CompaniesPage/CompanyCard";

function CompaniesPage() {
  return (
    <div className="mt-20">
      <div>
        <div className="flex gap-5 items-center">
          <h2>Top companies hiring now</h2>
          <div className="rounded-3xl border shadow-sm py-1 px-3 border-gray-400">
            386
          </div>
        </div>
        <div>
          <CompanyCard />
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
