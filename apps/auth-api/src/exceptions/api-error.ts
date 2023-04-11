export default class ApiError extends Error {
  public status: number;

  public errors: string[];

  public constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static BadRequest = (message: string, errors: string[] = []) => new ApiError(400, message, errors);
}
