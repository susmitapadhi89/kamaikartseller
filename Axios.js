import axios from "axios";
import toast from "react-hot-toast";
export const API = axios.create({
  baseURL: "https://www.kamaikart.in/api/", // your API backend
  withCredentials: true,
});
// 🔄 Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 = Access token expired
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await API.post("/auth/refresh", {}, { withCredentials: true });

        // 🔁 Retry original request
        return API(originalRequest);
      } catch (err) {
        localStorage.removeItem("admin");
        localStorage.removeItem("isLoggedIn");
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        return Promise.reject(err);
      }
    }

    if (
      error.response?.data?.message === "Refresh token is required" ||
      error.response?.status === 401
    ) {
      toast.error("Session expired. Please login again.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }

    return Promise.reject(error);
  }
);
