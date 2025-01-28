import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8083/api/",
});

const axiosInstanceLogin = axios.create({
  baseURL: "http://localhost:8083/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { axiosInstance, axiosInstanceLogin };