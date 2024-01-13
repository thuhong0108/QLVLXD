import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/product';

export const getAllProducts = async() => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getProductsByCategory = async(categoryId) => {
    try {
        const response = await axios.get(`${BASE_URL}/get/${categoryId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const addProduct = async(categoryId, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/create/${categoryId}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const editProduct = async(id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/edit/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteProduct = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const searchProduct = async(value) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/${value}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const uploadImage = async(data) => {
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/ddwurilrw/image/upload', {
            method: 'POST',
            body: data
        })
        
        return response.json();
    } catch (error) {
        return error.message;
    }
}