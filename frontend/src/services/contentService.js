import { apiCall } from "./apiBase";

export const contentService = {
  getJobs,
  getSingleJob,
  getJobLocations,
  getCompanies,
  getSavedJobs,
};
async function getJobs(filters) {
  let params = new URLSearchParams();
  params.append("search", filters.search);
  params.append("datePosted", filters.datePosted);
  params.append("experience", filters.experience);
  params.append("salaryFrom", filters.salaryRange.from);
  params.append("salaryTo", filters.salaryRange.to);
  params.append("location", filters.location);
  filters.jobTypes.forEach((jobType) => params.append("type", jobType));
  filters.workMode.forEach((workMode) => params.append("workMode", workMode));

  return apiCall("get", "/jobs", { params: params });
}

async function getSingleJob(id) {
  return apiCall("get", `/jobs/${id}`);
}

async function getJobLocations(location) {
  return apiCall("get", "/job-locations", { params: { search: location } });
}

async function getCompanies() {
  return apiCall("get", "/companies");
}

async function getSavedJobs() {
  return apiCall("get", "/users/saved-jobs");
}
