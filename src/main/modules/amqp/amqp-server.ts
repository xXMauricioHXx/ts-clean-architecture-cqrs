import { Channel, Connection } from 'amqplib';
import { Module } from '@/main/modules';
import { RabbitMQServer } from '@/adapters';
import { RabbitMQConfig } from '@/adapters/ports';
import { CreatePaymentIntentionConsumer } from '@/presentation/amqp/consumers';

export class AMQPServer extends RabbitMQServer implements Module {
  protected channel: Channel;

  protected connection: Connection;

  constructor(protected readonly config: RabbitMQConfig) {
    super();
  }

  loadConsumers(): Function[] {
    return [CreatePaymentIntentionConsumer];
  }

  loadProducers(): Function[] {
    return [];
  }
}
