import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  console.error("❌ Missing NEXT_PUBLIC_API_BASE_URL in environment variables");
}

const axiosInstance = axios.create({
  baseURL,
});

// Add token to every request
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log("📌 Token in axios interceptor:", token); // debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log("📌 Axios request URL:", config.baseURL + config.url); // debug
  return config;
});

export default axiosInstance;
