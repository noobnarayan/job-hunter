import React, { useEffect, useState } from "react";
import { contentService } from "../services/contentService";
import { useNavigate } from "react-router-dom";

function SavedJobs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await contentService.getSavedJobs();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const redirectToDetail = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="mt-20 px-10">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((job, index) => (
          <div
            key={index}
            className="border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center hover:cursor-pointer"
            onClick={() => redirectToDetail(job._id)}
          >
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={job?.employer?.userProfile?.companyLogo}
                alt={`${job.company} logo`}
                className="w-10 h-10 mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-gray-500">
                  {job?.employer?.userProfile?.companyName}
                </p>
                <p className="text-sm text-gray-400">{job.location}</p>
                <p className="text-sm text-green-500">{job.salary}</p>
              </div>
            </div>
            <button className="bg-black text-white px-3 py-2 rounded self-center md:self-auto">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;
