import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
