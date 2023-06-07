import { Effect, Event } from 'effector';

import { CreateAxiosDefaults } from 'axios';

export type ApiClientConfig = {
  axiosConfig: CreateAxiosDefaults;
};

export type ApiRequestConfig = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
};

export type ApiClient = {
  init: Event<void>;
  requestFx: Effect<ApiRequestConfig, any>;
};

export type ApiErrorKind =
  | 'bad-data'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'server-error'
  | 'unknown';
