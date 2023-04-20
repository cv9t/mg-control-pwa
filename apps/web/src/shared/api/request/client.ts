import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { ApiError, ResponseError } from "@/shared/api/types";
import { env } from "@/shared/config";

const handleError = (error: ResponseError): ApiError => {
  if (error.response) {
    return { status: error.response.status, message: error.response.data.message };
  } else if (error.request) {
    return { status: 500, message: "Произошла ошибка в запросе" };
  } else {
    return { status: 500, message: "Что-то пошло не так" };
  }
};

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("mg-control-user-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${env.BACKEND_URL}/api/v1`,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: ResponseError) => Promise.reject(handleError(error))
);

axiosInstance.interceptors.request.use(handleRequest);

const client = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  post: async <T, R>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  put: async <T, R>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};

export default client;
