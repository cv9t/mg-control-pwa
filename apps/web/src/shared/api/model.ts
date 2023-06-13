import { attach, createEffect, Effect, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { API_URL } from '../config';
import { $$notificationModel, NotificationModel, NotificationOptions } from '../lib';
import { $$tokenStorageModel, TokenStorageModel } from '../token-storage';

import { ApiError, ApiErrorType } from './error';

type BaseRequestOptions<T = unknown> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: T;
  headers?: Record<string, string>;
  ignoreErrorTypes?: ApiErrorType[];
  errorNotificationOptions?: NotificationOptions;
};

export type RequestOptions<T = unknown> = { data?: T } & Pick<
  BaseRequestOptions,
  'ignoreErrorTypes' | 'errorNotificationOptions'
>;

type RequestFactory<D = unknown, R = unknown> = <T_1 extends D, T_2 extends R>(
  params: Pick<BaseRequestOptions, 'url' | 'method'>,
) => Effect<RequestOptions<T_1>, T_2, ApiError>;

type ApiFactoryOptions = {
  $$notificationModel: NotificationModel;
  $$tokenStorageModel: TokenStorageModel;
  axiosConfig: CreateAxiosDefaults;
};

type ErrorResponse = AxiosError<{ message: string; type: ApiErrorType }>;

// TODO: добавить возможность валидации по контракту
const apiFactory = modelFactory(
  ({ $$notificationModel, $$tokenStorageModel, axiosConfig }: ApiFactoryOptions) => {
    const axiosInstance = axios.create(axiosConfig);

    const handleError = (error: ErrorResponse): ApiError => {
      if (error.response) {
        const { status } = error.response;
        const { message, type } = error.response.data;
        return { status, message, type };
      }
      return { status: 600, message: error.message, type: 'unknown' };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseRequestFx = createEffect<BaseRequestOptions, any, ApiError>((options) =>
      axiosInstance({ ...options })
        .then(
          // eslint-disable-next-line no-promise-executor-return
          (response) => new Promise((resolve) => setTimeout(() => resolve(response.data), 2000)),
        )
        .catch(
          // eslint-disable-next-line no-promise-executor-return
          (error) => new Promise((_, reject) => setTimeout(() => reject(handleError(error)), 2000)),
        ),
    );

    const authorizedRequestFx = attach({
      source: $$tokenStorageModel.$token,
      effect: baseRequestFx,
      mapParams: (options: BaseRequestOptions, token) => ({
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });

    const createRequestFx: RequestFactory = (params) =>
      attach({
        effect: baseRequestFx,
        mapParams: (options) => ({
          ...params,
          ...options,
        }),
      });

    const createAuthorizedRequestFx: RequestFactory = (params) =>
      attach({
        effect: authorizedRequestFx,
        mapParams: (options) => ({
          ...params,
          ...options,
        }),
      });

    sample({
      clock: baseRequestFx.fail,
      filter({ params, error }) {
        return !params.ignoreErrorTypes?.includes(error.type);
      },
      fn({ params }): NotificationOptions {
        return (
          params.errorNotificationOptions ?? {
            title: 'Error!',
            message: 'Oops! Something went wrong.',
          }
        );
      },
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
