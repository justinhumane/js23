import axios from "axios";

let baseUrl = "http://localhost:3000/api";
if (import.meta.env.NODE_ENV === "development") {
  baseUrl = import.meta.env.VUE_APP_SERVER || "/api";
} else {
  baseUrl = import.meta.env.BASE_URL + "api";
}

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
