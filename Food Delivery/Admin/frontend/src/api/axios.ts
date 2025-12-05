import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
});

// Automatically add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired OR invalid token OR unauthorized request
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("Token"); // delete token
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
