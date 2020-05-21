import axios from 'axios';

const api = axios.create({
    baseURL: "https://estoque-tecnet.herokuapp.com/",
});

export default api;