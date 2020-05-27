import axios from 'axios';

const api = axios.create({
    baseURL: 'http://168.228.219.200:45030',
});

export default api;