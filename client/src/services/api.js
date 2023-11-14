import axios from "axios";

let baseUrl = "https://js23api.justinhumane.com";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});

export default api;
