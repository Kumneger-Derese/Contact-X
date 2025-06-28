import Joi from 'joi';

const idValidation = Joi.string().length(24).required().messages({
  'string.base': 'Id must be string',
  'string.length': 'Id must be exactly {#limit} characters long',
  'any.required': 'Id is required.',
});

const name = Joi.string().min(2).messages({
  'string.base': '{#label} must be string',
  'string.empty': '{#label} must not be empty',
  'string.min': '{#label} should be at least {#limit} characters long',
  'any.required': '{#label} is required.',
});

const createContactSchema = Joi.object({
  name: name.required(),
  phone: Joi.number().required().messages({
    'number.base': '{#label} number must be string',
    'number.empty': '{#label} number must not be empty',
    'any.required': '{#label} is required.',
  }),
  category: Joi.string().required().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
    'any.required': '{#label} is required.',
  }),
  favorite: Joi.boolean().default(false).optional().messages({
    'boolean.base': '{#label} must be string',
    'boolean.empty': '{#label} must not be empty',
    'any.required': '{#label} is required.',
  }),
});

const updateContactSchema = Joi.object({
  name,
  phone: Joi.number().optional().messages({
    'number.base': '{#label} number must be string',
    'number.empty': '{#label} number must not be empty',
  }),
  category: Joi.string().optional().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
  }),
  favorite: Joi.boolean().optional().messages({
    'boolean.base': '{#label} must be string',
    'boolean.empty': '{#label} must not be empty',
  }),
}).unknown();

const searchContactSchema = Joi.object({
  name: name.optional(),
});

export {
  createContactSchema,
  updateContactSchema,
  idValidation,
  searchContactSchema,
};
