import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // Check if token is expired before adding it
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (tokenPayload.exp > currentTime) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        } else {
          // Token is expired, remove it
          localStorage.removeItem("token");
        }
      } catch (error) {
        // Invalid token format, remove it
        localStorage.removeItem("token");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        //redirect to login page if unauthorized
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.log("Server error. please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("Request timeout. Please try again");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
