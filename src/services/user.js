import api from "../configs/api.js";

const getBills = () => api.get("/");

const getBill = (id) => api.get(`/${id}`);

const getCurrentUser = () => api.get(`/current-user`);

const logoutUser = () => api.post("/logout");

const createBill = (data) => api.post("/", { ...data });

const getUser = (data) => api.post("/login", { ...data });

export { getBills, getBill, createBill, getUser, getCurrentUser, logoutUser };
