import { attach, createEffect } from 'effector';

import axios, { AxiosError } from 'axios';

import { env } from '../config';
import * as tokenStorage from '../token-storage';

import { ApiError, ApiErrorType } from './error';

export type RequestConfig<T = unknown> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: T;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

type ErrorResponse = AxiosError<{ type: ApiErrorType }>;

const axiosInstance = axios.create({
  baseURL: `${env.BACKEND_URL}/api/v1`,
  withCredentials: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseRequestFx = createEffect<RequestConfig, any, ApiError>((config) =>
  axiosInstance({ ...config })
    .then((response) => response.data)
    .catch((error: ErrorResponse) => Promise.reject(handleErrorResponse(error))),
);

export const publicRequestFx = attach({ effect: baseRequestFx });

export const authorizedRequestFx = attach({
  source: tokenStorage.$token,
  effect: baseRequestFx,
  mapParams: (config: RequestConfig, token) => ({
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
});

function handleErrorResponse(error: ErrorResponse): ApiError {
  if (error.response) {
    const { status } = error.response;
    const { type } = error.response.data;
    return { status, type };
  }
  return { status: 600, type: 'unknown' };
}
