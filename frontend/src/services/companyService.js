import axios from "axios";
import { api_url } from "../../config";

export const companyService = {
  getAllJobListings,
  getActiveJobListings,
  getNonActiveJobListings,
  getAllApplications,
  getShortListedCandidates,
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

async function getActiveJobListings() {
  try {
    const res = await axios.get(`${api_url}/company/active-listings`, {
      withCredentials: true,
    });
    const jobs = res.data.data;
    return jobs;
  } catch (error) {
    throw error;
  }
}

async function getNonActiveJobListings() {
  try {
    const res = await axios.get(`${api_url}/company/non-active-listings`, {
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

async function getShortListedCandidates() {
  try {
    const res = await axios.get(`${api_url}/company/shortlisted-candidates`, {
      withCredentials: true,
    });
    const jobs = res.data.data;
    return jobs;
  } catch (error) {
    throw error;
  }
}
