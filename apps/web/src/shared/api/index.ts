import { attach, createEffect, Effect, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { API_URL } from '../config';
import { $$notificationModel, NotificationModel, NotificationOptions } from '../lib';
import { $$tokenStorageModel, TokenStorageModel } from '../token-storage';

import { ApiError, ApiErrorType } from './error';

export * from './error';

type RequestConfig<T = unknown> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: T;
  headers?: Record<string, string>;
  ignoreErrorTypes?: ApiErrorType[];
  errorNotificationOptions?: NotificationOptions;
};

export type ApiRequestConfig<T = unknown> = { data?: T } & Pick<
  RequestConfig,
  'ignoreErrorTypes' | 'errorNotificationOptions'
>;

type RequestFactory<D = unknown, R = unknown> = <T_1 extends D, T_2 extends R>(
  params: Pick<RequestConfig, 'url' | 'method'>,
) => Effect<ApiRequestConfig<T_1>, T_2, ApiError>;

type ApiFactoryOptions = {
  $$notificationModel: NotificationModel;
  $$tokenStorageModel: TokenStorageModel;
  axiosConfig: CreateAxiosDefaults;
};

type ApiErrorResponse = AxiosError<{ message: string; type: ApiErrorType }>;

// TODO: добавить возможность валидации по контракту
const apiFactory = modelFactory(
  ({ $$notificationModel, $$tokenStorageModel, axiosConfig }: ApiFactoryOptions) => {
    const axiosInstance = axios.create(axiosConfig);

    const handleError = (error: ApiErrorResponse): ApiError => {
      if (error.response) {
        const { status } = error.response;
        const { message, type } = error.response.data;
        return { status, message, type };
      }
      return { status: 600, message: error.message, type: 'unknown' };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseRequestFx = createEffect<RequestConfig, any, ApiError>((requestConfig) =>
      axiosInstance({ ...requestConfig })
        .then(
          // eslint-disable-next-line no-promise-executor-return
          (response) => new Promise((resolve) => setTimeout(() => resolve(response.data), 2000)),
        )
        .catch(
          // eslint-disable-next-line no-promise-executor-return
          (error) => new Promise((_, reject) => setTimeout(() => reject(handleError(error)), 2000)),
        ),
    );

    const requestFx = attach({ effect: baseRequestFx });

    const authorizedRequestFx = attach({
      source: $$tokenStorageModel.$token,
      effect: baseRequestFx,
      mapParams: (requestConfig: RequestConfig, token) => ({
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });

    const createRequestFx: RequestFactory = (params) =>
      attach({
        effect: requestFx,
        mapParams: (options): RequestConfig => ({
          ...params,
          ...options,
        }),
      });

    const createAuthorizedRequestFx: RequestFactory = (params) =>
      attach({
        effect: authorizedRequestFx,
        mapParams: (options): RequestConfig => ({
          ...params,
          ...options,
        }),
      });

    sample({
      clock: baseRequestFx.fail,
      filter: ({ params: { ignoreErrorTypes }, error }) => !ignoreErrorTypes?.includes(error.type),
      fn: ({ params: { errorNotificationOptions } }): NotificationOptions =>
        errorNotificationOptions ?? { title: 'Error!', message: 'Oops! Something went wrong.' },
      target: $$notificationModel.showError,
    });

    return {
      createRequestFx,
      createAuthorizedRequestFx,
    };
  },
);

export type ApiModel = Model<typeof apiFactory>;

export const $$apiModel = apiFactory.createModel({
  $$notificationModel,
  $$tokenStorageModel,
  axiosConfig: {
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true,
  },
});
