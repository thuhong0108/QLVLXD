import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/auth';

export const login = async(data) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const register = async(data) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}