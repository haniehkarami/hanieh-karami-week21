import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", 
});

API.interceptors.request.use((req) => {
  console.log(" Making request to:", req.url);
  console.log("Full URL:", req.baseURL + req.url);

  const token = localStorage.getItem("token");
  console.log(" Token:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
