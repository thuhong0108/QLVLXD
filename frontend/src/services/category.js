import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/category';

export const getAllCategories = async() => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}