import Joi from 'joi';

export const createPaymentIntentionSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required().uuid({ version: 'uuidv4' }),
    payer_id: Joi.number().required(),
    receiver_id: Joi.number().required(),
    description: Joi.string(),
    value: Joi.number().positive().required(),
  }),
});
