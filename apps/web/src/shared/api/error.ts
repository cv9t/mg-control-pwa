type ApiErrorKind =
  | 'bad-data'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'server-error'
  | 'unknown';

export class ApiError {
  public constructor(public message: string) {}

  public static is(error: Error): boolean {
    return error instanceof this;
  }
}

const createApiError = (kind: ApiErrorKind): typeof ApiError =>
  class extends ApiError {
    public kind: ApiErrorKind;

    public constructor(message: string) {
      super(message);
      this.kind = kind;
    }
  };

export const BadDataError = createApiError('bad-data');
export const UnauthorizedError = createApiError('unauthorized');
export const ForbiddenError = createApiError('forbidden');
export const NotFoundError = createApiError('not-found');
export const ServerError = createApiError('server-error');
export const UnknownError = createApiError('unknown');

export const ERROR_STATUSES = {
  bad_data: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  server_error: 500,
  unknown: 600,
};
