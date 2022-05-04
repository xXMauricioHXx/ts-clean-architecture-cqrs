import * as dotenv from 'dotenv';
import { EnvValidator } from '@/main/env/validator';

dotenv.config();

const props = {
  httpPort: parseInt(process.env.HTTP_PORT || '3000', 10),
  httpBodyLimit: process.env.HTTP_BODY_LIMIT || '10kb',
  maxAmountPerDay: parseInt(process.env.MAX_AMOUNT_PER_DAY || '5000'),
  maxHourToTransferAmout: parseInt(
    process.env.MAX_HOUR_TO_TRANSFER_AMOUNT || '18'
  ),
  maxValueToTransferAfterMaxHour: parseInt(
    process.env.MAX_VALUE_TO_TRANSFER_AFTER_MAX_HOUR || '100'
  ),
  rabbitMQHost: process.env.RABBIT_MQ_HOST || 'localhost',
  rabbitMQPassword: process.env.RABBIT_MQ_PASSWORD || '',
  rabbitMQPort: parseInt(process.env.RABBIT_MQ_PORT || '5672', 10),
  rabbitMQUsername: process.env.RABBIT_MQ_USERNAME || '',
  rabbitMQVHost: process.env.RABBIT_MQ_VHOST || '/',
  rabbitMQProtocol: process.env.RABBIT_MQ_PROTOCOL || 'amqp',
  dbClient: process.env.DB_CLIENT || 'mysql2',
  dbHost: process.env.DB_HOST || 'localhost',
  dbUsername: process.env.DB_USERNAME || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbDatabase: process.env.DB_DATABASE || '',
  dbPort: parseInt(process.env.DB_PORT || '3600', 10),
  dbPoolMax: parseInt(process.env.DB_POOL_MAX || '1', 10),
  dbPoolMin: parseInt(process.env.DB_POOL_MIN || '1', 10),
};

export const env = new EnvValidator(props);
