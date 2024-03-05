import axios from "axios";
import { api_url } from "../../config";

export const companyService = {
  postNewJob,
  getAllJobListings,
  getNonActiveJobListings,
  getCompanyJobListings,
  generateJobDescription,
  getActiveJobListings,
  getNonActiveJobListings,
  getAllApplications,
  getShortListedCandidates,
  shortlistCandidate,
  removeApplication,
  removeFromShortlist,
};

async function getAllJobListings() {
  try {
    const res = await axios.get(`${api_url}/company/listings`, {
      withCredentials: true,
    });
    const jobs = res.data.data;
    return jobs;
  } catch (error) {
    throw error;
  }
}

async function getAllApplications() {
  try {
    const res = await axios.get(`${api_url}/company/applications`, {
      withCredentials: true,
    });
    const jobs = res.data.data;
    return jobs;
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

async function getShortListedCandidates() {
  try {
    const res = await axios.get(`${api_url}/company/shortlisted-candidates`, {
      withCredentials: true,
    });
    const candidates = res.data.data;
    return candidates;
  } catch (error) {
    throw error;
  }
}

async function shortlistCandidate(data) {
  try {
    try {
      const res = await axios.post(
        `${api_url}/company/shortlist-candidate`,
        data,
        {
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  } catch (error) {}
}

async function removeApplication(data) {
  try {
    try {
      const res = await axios.post(
        `${api_url}/company/remove-from-applications`,
        data,
        {
          withCredentials: true,
        }
      );

      return res;
    } catch (error) {
      throw error;
    }
  } catch (error) {}
}

async function removeFromShortlist(data) {
  try {
    const res = await axios.post(
      `${api_url}/company/remove-from-shortlisted`,
      data,
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
}
