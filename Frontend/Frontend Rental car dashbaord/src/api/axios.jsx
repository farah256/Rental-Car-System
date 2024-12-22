// Create an axios instance (src/api/axios.js)
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082'
});

// Add request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;