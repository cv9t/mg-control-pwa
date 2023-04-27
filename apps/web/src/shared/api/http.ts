import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { env, plugs } from "@/shared/config";

import { alert, helpers } from "../lib";

import { ApiError, ApiErrorKind, ErrorResponse } from "./types";

const getErrorKind = (status: number): ApiErrorKind => {
  if (status === 400) {
    return "bad-data";
  } else if (status === 401) {
    return "unauthorized";
  } else if (status === 403) {
    return "forbidden";
  } else if (status === 404) {
    return "not-found";
  } else if (status >= 500 && status < 600) {
    return "server-error";
  } else {
    return "unknown";
  }
};

const getApiError = (error: ErrorResponse): ApiError => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message;
    const kind = getErrorKind(status);
    return { status, message, kind };
  }
  return { status: 500, message: plugs.UNEXPECTED_ERROR, kind: "unknown" };
};

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = helpers.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleError = (error: ErrorResponse) => {
  const apiError = getApiError(error);
  if (apiError.kind === "unauthorized") {
    helpers.removeAccessToken();
    if (error.config?._error_alert) {
      alert.error(error.message);
    }
  }
  return apiError;
};

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${env.BACKEND_URL}/api/v1`,
  _error_alert: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: ErrorResponse) => Promise.reject(handleError(error))
);

axiosInstance.interceptors.request.use(handleRequest);

export const client = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get(url, config);
    return response.data;
  },

  post: async <T, R = unknown>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  },

  put: async <T, R = unknown>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  },
};
