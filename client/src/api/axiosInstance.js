import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
api.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === "401") {
      console.log(
        "Session Expired or invalid Login.Redirecting to Login Page."
      );
      window.location.href = "/auth/login";
    }
  }
);
export default api;
