import mongoose from 'mongoose';
import { ApiError } from '../../utils/ApiError.js';

// Not found handler
const notFound = (req, res, next) => {
  const error = new ApiError(`Not Found - ${req.originalUrl} endpoint`, 404);
  next(error);
};

// Error converter
const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message =
      error.message ||
      (statusCode === 400 && 'Bad Request') ||
      (statusCode === 500 && 'Internal Server Error');

    error = new ApiError(message, statusCode, false, error.stack);
  }

  next(error);
};

// Error handler
const errorHandler = (error, req, res, next) => {
  let { message, statusCode, isOperational, stack } = error;

  if (process.env.NODE_ENV === 'production' && !isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  const errorResponse = {
    error: true,
    code: statusCode,
    message,
    stack: process.env.NODE_ENV !== 'production' ? stack : null,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log({ error });
  }

  res.status(statusCode).json(errorResponse);
};

export { notFound, errorConverter, errorHandler };
