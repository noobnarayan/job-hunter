import axios from "axios";
import { api_url } from "../../config";

export const contentService = {
  getJobs,
  getSingleJob,
  postNewJob,
  generateJobDescription,
  getCompanyJobListings,
  getActiveJobListings,
  getNonActiveJobListings,
  getAllApplications,
  getShortListedCandidates,
};

async function getJobs() {
  try {
    const res = await axios.get(`${api_url}/jobs`, {
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
async function postNewJob(data) {
  try {
    const res = await axios.post(`${api_url}/jobs`, data, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function generateJobDescription(data) {
  try {
    const res = await axios.post(`${api_url}/generate-job-description`, data, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function getCompanyJobListings() {
  try {
    const res = await axios.get(`${api_url}/company/listings`, {
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}

async function getActiveJobListings() {
  try {
    const res = await axios.get(`${api_url}/company/active-listings`, {
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}

async function getNonActiveJobListings() {
  try {
    const res = await axios.get(`${api_url}/company/non-active-listings`, {
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}
async function getAllApplications() {
  try {
    const res = await axios.get(`${api_url}/company/applications`, {
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}
async function getShortListedCandidates() {
  try {
    const res = await axios.get(`${api_url}/company/shortlisted-candidates`, {
      withCredentials: true,
    });
    const jobListings = res.data.data;
    return jobListings;
  } catch (error) {
    throw error;
  }
}
