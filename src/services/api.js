// Path: src/services/api.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("sg_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const authApi = {
    login: (memberId, password) => api.post("/auth/login", { memberId, password }),
    changePassword: (oldPassword, newPassword) =>
        api.put("/auth/change-password", { oldPassword, newPassword }),
};

export const userApi = {
    create: (fullName, role) => api.post("/users/create", { fullName, role }),
    getAll: () => api.get("/users"),
    resetPassword: (id) => api.put(`/users/${id}/reset-password`),
    bulkCreate: (members) => api.post("/users/bulk-create", { members }),
    updateMe: (fullName) => api.put("/users/me", { fullName }),
};

export const membershipRequestApi = {
    create: (data) => api.post("/membership-requests", data),
    getAll: (status) => api.get("/membership-requests", { params: { status } }),
    accept: (id) => api.put(`/membership-requests/${id}/accept`),
    reject: (id, reason) => api.put(`/membership-requests/${id}/reject`, { reason }),
};

export const eventApi = {
    create: (data) => api.post("/events", data),
    getAll: () => api.get("/events"),
    getById: (id) => api.get(`/events/${id}`),
    update: (id, data) => api.put(`/events/${id}`, data),
    remove: (id) => api.delete(`/events/${id}`),
};

export const participationApi = {
    register: (eventId) => api.post("/participations/register", { eventId }),
    markUnavailable: (eventId) => api.post("/participations/unavailable", { eventId }),
    getMine: () => api.get("/participations/me"),
    getForEvent: (eventId) => api.get(`/participations/event/${eventId}`),
    validate: (id, status) => api.put(`/participations/${id}/validate`, { status }),
};

export const contributionApi = {
    create: (data) => api.post("/contributions", data),
    getMine: (year) => api.get("/contributions/me", { params: { year } }),
    getForUser: (userId) => api.get(`/contributions/user/${userId}`),
    getAll: (year) => api.get("/contributions", { params: { year } }),
};

export const initiativeApi = {
    create: (data) => api.post("/initiatives", data),
    getMine: () => api.get("/initiatives/me"),
    getAll: (status) => api.get("/initiatives", { params: { status } }),
    review: (id, status, rejectionReason) =>
        api.put(`/initiatives/${id}/review`, { status, rejectionReason }),
};

export const settingsApi = {
    get: () => api.get("/settings"),
    update: (data) => api.put("/settings", data),
};

export const statsApi = {
    get: () => api.get("/stats"),
};

export default api;