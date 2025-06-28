import { ApiError } from '../utils/ApiError.js';


const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return next(new ApiError(errors, 400));
    }

    next();
  };
};

export { validate };
