import axios from "axios";
import { api_url } from "../../config";

export const userService = {
  login,
  signup,
  logout,
  getCurrentUser,
  updateProfilePicture,
  updateUserProfile,
  addSkill,
  removeSkill,
  updateResume,
};

async function login(userData) {
  try {
    const res = await axios.post(`${api_url}/users/login`, userData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function signup(userData) {
  try {
    const res = await axios.post(`${api_url}/users/signup`, userData);
    return res;
  } catch (error) {
    throw error;
  }
}

async function updateProfilePicture(file) {
  const formPayload = new FormData();
  formPayload.append("profilePicture", file);

  try {
    const response = await axios.post(
      `${api_url}/users/profile-picture`,
      formPayload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {
    await axios.get(`${api_url}/users/logout`, { withCredentials: true });
  } catch (error) {
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const res = await axios.get(`${api_url}/users/profile`, {
      withCredentials: true,
    });
    const userData = res.data.data;
    return userData;
  } catch (error) {
    throw error;
  }
}

async function updateUserProfile(data) {
  try {
    const res = await axios.patch(`${api_url}/users/profile/jobseeker`, data, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function addSkill(skill) {
  try {
    const res = await axios.post(
      `${api_url}/users/add-skill`,
      { skill },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
}

async function removeSkill(skill) {
  try {
    const res = await axios.post(
      `${api_url}/users/remove-skill`,
      { skill },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
}

async function updateResume(resume) {
  try {
    const res = await axios.post(
      `${api_url}/users/resume`,
      { resume },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
}
