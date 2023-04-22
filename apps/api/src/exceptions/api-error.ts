class ApiError extends Error {
  public constructor(public status: number, message: string, public errors: string[] = []) {
    super(message);
  }

  public static Unauthorized(message = "", errors: string[] = []) {
    return new ApiError(401, message || "Пользователь не авторизован", errors);
  }

  public static BadRequest(message: string, errors: string[] = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
