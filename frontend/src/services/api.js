import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api`,
  withCredentials: true,
  timeout: 15000,
});

export default API;
