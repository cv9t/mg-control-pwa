import { ERROR_TYPE } from '@mg-control/shared/typings';

export type ApiErrorType = keyof typeof ERROR_TYPE | 'unknown' | 'network_error';

export type ApiError = {
  status: number;
  type: ApiErrorType;
  message: string;
};

export const isBadRequestError = (error: ApiError): boolean => error.status === 400;
export const isUnauthorizedError = (error: ApiError): boolean => error.status === 401;
export const isForbiddenError = (error: ApiError): boolean => error.status === 403;
export const isNotFoundError = (error: ApiError): boolean => error.status === 404;
export const isServerError = (error: ApiError): boolean =>
  error.status >= 500 && error.status < 600;
export const isUnknownError = (error: ApiError): boolean => error.status > 600;
