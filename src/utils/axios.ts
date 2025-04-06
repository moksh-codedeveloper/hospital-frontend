// utils/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // httpOnly cookies enabled
});

export default API;
