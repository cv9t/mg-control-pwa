class ValidationError extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export default ValidationError;
