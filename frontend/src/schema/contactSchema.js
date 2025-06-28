import Joi from 'joi';

const createContactSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
    'string.min': '{#label} should be at least {#limit} charcter.',
    'any.required': '{#label} is required.',
  }),
  phone: Joi.number().required().messages({
    'number.base': '{#label} number must be number',
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
}).unknown();

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).optional().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
    'string.min': '{#label} should be at least {#limit} charcter.',
  }),
  phone: Joi.number().optional().messages({
    'number.base': '{#label} number must be number',
    'number.empty': '{#label} number must not be empty',
  }),
  category: Joi.string().optional().messages({
    'string.base': '{#label} must be string',
    'string.empty': '{#label} must not be empty',
  }),
  favorite: Joi.boolean().default(false).optional().messages({
    'boolean.base': '{#label} must be string',
    'boolean.empty': '{#label} must not be empty',
  }),
}).unknown();

export { createContactSchema, updateContactSchema };
