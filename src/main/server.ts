import 'module-alias/register';
import { ValidationError } from 'class-validator';
import logger from '@/logger';
import { Application } from '@/main/app';

const application = new Application();

setImmediate(async () => {
  try {
    await application.start();
    logger.info('Application started');
  } catch (error) {
    if (error.length && error[0] instanceof ValidationError) {
      error.forEach((item: ValidationError) => {
        for (const key in item.constraints) {
          if (key) {
            const message = item.constraints[key];
            throw new Error(message);
          }
        }
      });
    }

    throw error;
  }
});
