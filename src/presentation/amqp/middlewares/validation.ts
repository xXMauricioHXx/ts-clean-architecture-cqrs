import Joi from 'joi';
import { ValidationError } from '@/shared/validation-error';

export const validation = (schema: Joi.Schema, message: any) => {
  const validation = schema.validate(message, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validation.error) {
    throw new ValidationError(validation.error.details);
  }

  return validation.value;
};
