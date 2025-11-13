import axios from "axios";

const api = axios.create({
  baseURL: "https://eventify-server-sigma.vercel.app", // HTTPS backend
});

export default api;