// api.js
import axios from "axios";
import API_BASE from "./API";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, 
});

export default api;
