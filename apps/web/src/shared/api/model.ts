import { attach, createEffect, Effect, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { API_URL } from '../config';
import { $$notificationModel, delay, NotificationModel, NotificationOptions } from '../lib';
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

type ErrorResponse = AxiosError<{ type: ApiErrorType }>;

// TODO: добавить возможность валидации по контракту
const apiFactory = modelFactory(
  ({ $$notificationModel, $$tokenStorageModel, axiosConfig }: ApiFactoryOptions) => {
    const axiosInstance = axios.create(axiosConfig);

    const handleError = (error: ErrorResponse): ApiError => {
      if (error.response) {
        const { status } = error.response;
        const { type } = error.response.data;
        return { status, type };
      }
      return { status: 600, type: 'unknown' };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseRequestFx = createEffect<BaseRequestOptions, any, ApiError>((options) =>
      axiosInstance({ ...options })
        .then((response) => delay(2000).then(() => response.data))
        .catch((error) => delay(2000).then(() => Promise.reject(handleError(error)))),
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
