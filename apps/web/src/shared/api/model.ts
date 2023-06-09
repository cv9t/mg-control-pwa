import { attach, createEffect, Effect } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import axios, { CreateAxiosDefaults, isAxiosError } from 'axios';

import { API_URL } from '../config';
import { $$tokenStorageModel } from '../token-storage';

import {
  ApiError,
  BadDataError,
  ERROR_STATUSES,
  ForbiddenError,
  ServerError,
  UnauthorizedError,
  UnknownError,
} from './error';

type RequestConfig = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
};

type CreateRequest<B = unknown, R = unknown> = <T_1 extends B, T_2 extends R>(
  params: Pick<RequestConfig, 'path' | 'method'>,
) => Effect<T_1, T_2>;

type ApiFactoryOptions = {
  axiosConfig: CreateAxiosDefaults;
};

const processStatus = (status: number): typeof ApiError => {
  if (status === ERROR_STATUSES.bad_data) {
    return BadDataError;
  }
  if (status === ERROR_STATUSES.unauthorized) {
    return UnauthorizedError;
  }
  if (status === ERROR_STATUSES.forbidden) {
    return ForbiddenError;
  }
  if (status >= ERROR_STATUSES.server_error && status < ERROR_STATUSES.unknown) {
    return ServerError;
  }
  return UnknownError;
};

const handleError = (error: Error): ApiError | Error => {
  if (isAxiosError(error) && error.response) {
    const { status } = error.response;
    const message = error.response.data.message ?? 'Oops! Something went wrong 😨';
    const ErrorType = processStatus(status);
    return new ErrorType(message);
  }
  return error;
};

const apiFactory = modelFactory(({ axiosConfig }: ApiFactoryOptions) => {
  const axiosInstance = axios.create(axiosConfig);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestFx = createEffect<RequestConfig, any>((requestConfig) =>
    axiosInstance({ ...requestConfig })
      .then((response) => response.data)
      .catch((error: Error) => Promise.reject(handleError(error))),
  );

  const authorizedRequestFx = attach({
    source: $$tokenStorageModel.$token,
    effect: requestFx,
    mapParams: (requestConfig: RequestConfig, token) => ({
      ...requestConfig,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  });

  const createRequestFx: CreateRequest = (params) =>
    attach({
      effect: requestFx,
      mapParams: (body) => ({
        ...params,
        body,
      }),
    });

  const createAuthorizedRequestFx: CreateRequest = (params) =>
    attach({
      effect: authorizedRequestFx,
      mapParams: (body) => ({
        ...params,
        body,
      }),
    });

  return {
    createRequestFx,
    createAuthorizedRequestFx,
  };
});

export type ApiModel = Model<typeof apiFactory>;

export const $$apiModel = apiFactory.createModel({
  axiosConfig: {
    baseURL: API_URL,
    withCredentials: true,
  },
});
