import Joi from 'joi';

export const createPaymentIntentionSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required().uuid({ version: 'uuidv4' }),
    payer_id: Joi.string().required(),
    receiver_id: Joi.string().required(),
    value: Joi.number().positive().required(),
    description: Joi.string(),
  }),
});
