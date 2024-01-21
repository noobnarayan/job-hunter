import axios from "axios";
import { api_url } from "../../config";

export const userService = {
    login,
    signup,
    updateProfilePicture,
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