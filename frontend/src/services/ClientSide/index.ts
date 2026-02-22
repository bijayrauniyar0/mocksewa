import axios, { AxiosInstance } from "axios";

import { API_URL } from "@/constants";

export const apiURL = API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5 * 60 * 1000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authenticated = (apiInstance: AxiosInstance) => {
  apiInstance.defaults.withCredentials = true; // Automatically send cookies with requests
  return apiInstance;
};
