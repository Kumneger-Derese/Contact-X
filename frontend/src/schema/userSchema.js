import Joi from 'joi';

const password = Joi.string().min(6).messages({
  'string.base': '{#label} must be string',
  'string.empty': '{#label} must not be empty',
  'string.min': '{#label} should be at least {#limit}',
  'any.required': '{#label} is required.',
});

const email = Joi.string()
  .email({ tlds: { allow: false } })
  .messages({
    'string.base': '{#label} must be string',
    'string.email': '{#label} must be valid email.',
    'string.empty': '{#label} must not be empty',
    'any.required': '{#label} is required.',
  });

//* Register validation Schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
    'string.min': '{#label} should be atleast {#min}',
    'any.required': '{#label} is required.',
  }),
  email: email.required(),
  password: password.required(),
});

const profileSchema = Joi.object({
  name: Joi.string().min(2).required().label('Name').messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
    'string.min': '{#label} should be atleast {#min}',
    'any.required': '{#label} is required.',
  }),
  email: email.optional(),
  password: password.optional().allow(''),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
    'any.only': '{#label} must match with password.',
    'any.required': '{#label} is required.',
  }),
});

//* Login validation Schema
const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

export { registerSchema, loginSchema, profileSchema };
