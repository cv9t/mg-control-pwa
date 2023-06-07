import { attach, createEffect, createEvent, createStore, sample } from 'effector';

import axios, { AxiosInstance, isAxiosError } from 'axios';

import { Nullable } from '@mg-control/shared/types';

import {
  ApiError,
  BadDataError,
  ERROR_STATUSES,
  ForbiddenError,
  ServerError,
  UnauthorizedError,
  UnknownError,
} from './error';
import { ApiClient, ApiClientConfig, ApiRequestConfig } from './types';

function processStatus(status: number): typeof ApiError {
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
}

function handleError(error: Error): ApiError | Error {
  if (isAxiosError(error) && error.response) {
    const { status } = error.response;
    const message = error.response.data.message ?? 'Упс! Что то пошло не так 😨';
    const ErrorType = processStatus(status);
    return new ErrorType(message);
  }
  return error;
}

export function createApiClient({ axiosConfig }: ApiClientConfig): ApiClient {
  const $axiosInstance = createStore<Nullable<AxiosInstance>>(null);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const init = createEvent();

  const setupAxiosInstanceFx = createEffect(() => {
    const instance = axios.create({ ...axiosConfig });
    return instance;
  });

  const requestFx = attach({
    source: { axiosInstance: $axiosInstance },
    effect({ axiosInstance }, apiRequestConfig: ApiRequestConfig) {
      return axiosInstance?.({ ...apiRequestConfig })
        .then((response) => response.data)
        .catch((error: Error) => Promise.reject(handleError(error)));
    },
  });

  sample({ clock: init, target: setupAxiosInstanceFx });
  sample({ clock: setupAxiosInstanceFx.doneData, target: $axiosInstance });

  return {
    init,
    requestFx,
  };
}
