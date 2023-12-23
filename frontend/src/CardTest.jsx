import React from "react";

const JobCard = (job) => {
  console.log(job);
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 ">
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src={job.companyLogo} alt={job.company} />
      </div>
      <div className="gap-1">
        <div className="text-xl font-medium text-black">{job.position}</div>
        <p className="text-gray-500">
          {job.location.city}, {job.location.state}, {job.location.country}
        </p>
        <p className="text-gray-500">{job.description}</p>
        <p className="text-gray-500">
          Experience Level: {job.experience.experienceLevel}
        </p>
        <p className="text-gray-500">
          Minimum Experience: {job.experience.minYear} year(s)
        </p>
        <p className="text-gray-500">Qualifications: {job.qualifications}</p>
        <p className="text-gray-500">Job Type: {job.jobType}</p>
        <p className="text-gray-500">
          Job Location Type: {job.jobLocationType}
        </p>
        <p className="text-gray-500">
          Skills Required: {job.skills.join(", ")}
        </p>
        <p className="text-gray-500">
          Salary: {job.salary.currency} {job.salary.min} - {job.salary.max}
        </p>
        <p className="text-gray-500">
          Application Deadline:{" "}
          {new Date(
            job.applicationDeadline.seconds * 1000
          ).toLocaleDateString()}
        </p>
        <p className="text-gray-500">
          Posted On:{" "}
          {new Date(job.postedOn.seconds * 1000).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
