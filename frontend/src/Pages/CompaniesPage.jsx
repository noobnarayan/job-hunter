import React, { useEffect, useState } from "react";
import CompanyCard from "../components/CompaniesPage/CompanyCard";
import { contentService } from "../services/contentService";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await contentService.getCompanies();
      setCompanies(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <div>
        <div className="flex gap-5 items-center">
          <h2>Top companies hiring now</h2>
          <div className="rounded-3xl border shadow-sm py-1 px-3 border-gray-400">
            {companies.length}
          </div>
        </div>
        <div>
          {companies?.map((company) => (
            <CompanyCard key={company._id} company={company.userProfile} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
