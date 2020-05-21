import axios from 'axios';

const url = process.env.URL || `http://10.5.50.78:80/`;

const api = axios.create({
    baseURL: url,
});

export default api;