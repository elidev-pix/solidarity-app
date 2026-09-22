// src/services/api.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Injecte automatiquement le token JWT stocké après login dans chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("sg_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- AUTH ---
export function loginRequest(memberId, password) {
    return api.post("/auth/login", { memberId, password });
}

export function changePasswordRequest(oldPassword, newPassword) {
    return api.put("/auth/change-password", { oldPassword, newPassword });
}

// --- USERS (admin) ---
export function createUserRequest(fullName, role = "member") {
    return api.post("/users/create", { fullName, role });
}

export function getUsersRequest() {
    return api.get("/users");
}

export default api;