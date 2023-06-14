import { ERROR_TYPE } from '@mg-control/shared/typings';

export type ApiErrorType = keyof typeof ERROR_TYPE | 'unknown' | 'network_error';

export type ApiError = {
  status: number;
  type: ApiErrorType;
};

export const isBadRequestError = ({ status }: ApiError): boolean => status === 400;
export const isUnauthorizedError = ({ status }: ApiError): boolean => status === 401;
export const isForbiddenError = ({ status }: ApiError): boolean => status === 403;
export const isNotFoundError = ({ status }: ApiError): boolean => status === 404;
export const isServerError = ({ status }: ApiError): boolean => status >= 500 && status < 600;
export const isUnknownError = ({ status }: ApiError): boolean => status > 600;
