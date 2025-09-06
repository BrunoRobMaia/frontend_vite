import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use((config) => {
  const storagedUser = localStorage.getItem("@Info:user");
  if (storagedUser) {
    const { token } = JSON.parse(storagedUser);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
