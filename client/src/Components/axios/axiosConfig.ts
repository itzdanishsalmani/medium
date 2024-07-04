import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:"https://server.salmanidanish488.workers.dev/api/v1"
    baseURL:"http://localhost:8787/api/v1"
})

export default axiosInstance;