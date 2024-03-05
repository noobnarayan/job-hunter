import React, { useEffect, useState } from "react";
import ApplicantsCard from "./ApplicantsCard";
import SelectInput from "../Common/FormComponents/SelectInput";
import { companyService } from "../../services/companyService";

function Shortlisted() {
  const [sortValue, setSortValue] = useState("latest value");
  const sortOptions = [
    { value: "experience", label: "Experience" },
    { value: "date", label: "Application Date" },
  ];

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await companyService.getShortListedCandidates();
      setShortlistedCandidates(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-3 px-2 md:px-8 lg:px-20 ">
      <div className="font-medium text-2xl my-5 flex flex-col md:flex-row gap-3 justify-between md:items-center ml-5 md:ml-0">
        <span>Shortlisted Candidates</span>
        <div className="flex items-center gap-3">
          <span className="text-sm">Sort by</span>
          <SelectInput
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <div className="border rounded p-1.5 md:p-5 flex flex-col gap-5">
        {shortlistedCandidates.length > 0 ? (
          shortlistedCandidates.map((applicant, index) => (
            <ApplicantsCard
              key={index}
              data={applicant}
              isShortlisted={true}
              fetchApplications={fetchApplications}
            />
          ))
        ) : (
          <p className="text-center font-medium">
            No shortlisted candidates found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Shortlisted;
