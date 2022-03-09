import axios from 'axios';

const searchApi = axios.create({
    baseURL: "https://localhost:7258/api"
    });
    
export default searchApi;