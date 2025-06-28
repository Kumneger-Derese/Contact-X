class ApiError extends Error {
  constructor(message, statusCode, isOperational = true, stack = '') {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational; // Indicates that this is a known error

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
