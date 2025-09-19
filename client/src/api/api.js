import axios from "axios";
import { getDeviceId, getDeviceInfo } from "../utils/device";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

// Attach token + deviceId automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["X-Device-ID"] = getDeviceId();
    config.headers["X-Device-Info"] = JSON.stringify(getDeviceInfo());
    return config;
});

// Auth
export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/signup", data);
export const logout = () => api.post("/auth/logout");
export const refreshToken = () => api.post("/auth/refresh", { refreshToken: localStorage.getItem("refreshToken") });

// Sessions
export const fetchMySessions = () => api.get("/sessions/me");
export const revokeSession = (id) => api.delete(`/sessions/me/${id}`);

// Streaks
export const getStreak = () => api.get("/users/me/streak");
export const getBestStreak = () => api.get("/users/me/streak/best");

// Users
export const fetchUsers = (role) => api.get("/users", { params: { role } });
export const fetchStudentDetail = (id) => api.get(`/users/students/${id}`);
export const fetchInstructorDetail = (id) => api.get(`/users/instructors/${id}`);

export default api;
