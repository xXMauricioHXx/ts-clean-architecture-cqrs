import Joi from 'joi';

export const schema = function (schema: Joi.ObjectSchema<any>): Function {
  return function (target: any) {
    target.schema = schema;
    target.hasSchema = true;
  };
};
