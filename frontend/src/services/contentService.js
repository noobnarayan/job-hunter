import axios from "axios";
import { api_url } from "../../config";

export const contentService = {
  getJobs,
  getSingleJob,
  getJobLocations,
  getCompanies,
  getSavedJobs,
};

async function getJobs(filters) {
  try {
    // Create a new instance of URLSearchParams
    let params = new URLSearchParams();

    // Append each filter as a separate parameter
    // Uncomment the lines as per your requirement
    params.append("search", filters.search);
    params.append("datePosted", filters.datePosted);
    params.append("experience", filters.experience);
    params.append("salaryFrom", filters.salaryRange.from);
    params.append("salaryTo", filters.salaryRange.to);
    params.append("location", filters.location);

    // Append each job type as a separate parameter
    filters.jobTypes.forEach((jobType) => {
      params.append("type", jobType);
    });

    filters.workMode.forEach((workMode) => {
      params.append("workMode", workMode);
    });

    const res = await axios.get(`${api_url}/jobs`, {
      params: params,
      withCredentials: true,
    });

    const jobs = res.data.data;
    return jobs;
  } catch (error) {
    throw error;
  }
}

async function getSingleJob(id) {
  try {
    const res = await axios.get(`${api_url}/jobs/${id}`, {
      withCredentials: true,
    });
    const job = res.data.data;
    return job;
  } catch (error) {
    throw error;
  }
}

async function getJobLocations(location) {
  try {
    const res = await axios.get(`${api_url}/job-locations`, {
      params: {
        search: location,
      },
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}

async function getCompanies() {
  try {
    const res = await axios.get(`${api_url}/companies`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

async function getSavedJobs() {
  try {
    const res = await axios.get(`${api_url}/users/saved-jobs`, {
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}
