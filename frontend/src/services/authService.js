import axios from "axios";
import { api_url } from "../../config";

export const userService = {
    login,
    signup,
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
