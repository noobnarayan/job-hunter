import axios from "axios";
import { api_url } from "../../config";

export const contentService = { getJobs, getSingleJob };

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
