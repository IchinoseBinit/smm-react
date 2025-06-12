import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

export default axiosInstance;
