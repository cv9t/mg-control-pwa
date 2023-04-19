class ApiError extends Error {
  public status: number;

  public errors: string[];

  public constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static Unauthorized(errors: string[] = []) {
    return new ApiError(404, "Пользователь не авторизован", errors);
  }

  public static BadRequest(message: string, errors: string[] = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
