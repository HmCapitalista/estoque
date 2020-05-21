import axios from 'axios';

const api = axios.create({
    baseURL: `http://10.5.50.78:80/`,
});

export default api;