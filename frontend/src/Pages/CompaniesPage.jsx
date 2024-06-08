import React, { useEffect, useState } from "react";
import CompanyCard from "../components/CompaniesPage/CompanyCard";
import { contentService } from "../services/contentService";
import DisclaimerBanner from "../components/Common/DisclaimerBanner";

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
    <div className="mt-16 px-10">
      <DisclaimerBanner />
      <div>
        <div className="flex gap-5 items-center mb-5">
          <h2 className="text-2xl font-medium ">Top companies hiring now</h2>
          <div className="rounded-3xl border shadow-sm py-1 px-3 border-gray-400">
            {companies.length}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {companies?.map((company) => (
            <CompanyCard key={company._id} company={company.userProfile} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
