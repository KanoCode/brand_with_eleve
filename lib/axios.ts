import axios, { AxiosError } from "axios";

// Axios instance for your main API client
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
