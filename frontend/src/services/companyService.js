import apiClient from "./apiBase";

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
  return apiCall("get", "/company/listings");
}

async function getAllApplications() {
  return apiCall("get", "/company/applications");
}

async function postNewJob(data) {
  return apiCall("post", "/jobs", data);
}

async function generateJobDescription(data) {
  return apiCall("post", "/generate-job-description", data);
}

async function getCompanyJobListings() {
  return apiCall("get", "/company/listings");
}

async function getActiveJobListings() {
  return apiCall("get", "/company/active-listings");
}

async function getNonActiveJobListings() {
  return apiCall("get", "/company/non-active-listings");
}

async function getShortListedCandidates() {
  return apiCall("get", "/company/shortlisted-candidates");
}

async function shortlistCandidate(data) {
  return apiCall("post", "/company/shortlist-candidate", data);
}

async function removeApplication(data) {
  return apiCall("post", "/company/remove-from-applications", data);
}

async function removeFromShortlist(data) {
  return apiCall("post", "/company/remove-from-shortlisted", data);
}
