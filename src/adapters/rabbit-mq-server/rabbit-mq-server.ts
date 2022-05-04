import { Connection, Channel, ConsumeMessage, connect } from 'amqplib';
import { container, InjectionToken } from 'tsyringe';
import {
  AMQPChannelEvent,
  AMQPConnectionEvent,
  AMQPErrorCode,
  ContainerEvent,
} from '@/adapters/enum';
import logger from '@/logger';
import { EventEmmiter } from '@/adapters';
import { convertToJSON } from '@/shared/helpers';
import { RabbitMQConfig } from '@/adapters/ports';
import { validation } from '@/presentation/amqp/middlewares/validation';
import { Consumer, ConsumerErrorOptions } from '@/presentation/amqp/ports';

export abstract class RabbitMQServer {
  protected abstract connection: Connection;

  protected abstract channel: Channel;

  protected abstract config: RabbitMQConfig;

  private restarted = false;

  private timeout_id: NodeJS.Timeout;

  private event: EventEmmiter = EventEmmiter.getInstance();

  abstract loadConsumers(): Function[];

  abstract loadProducers(): Function[];

  constructor() {
    this.loadProducers().forEach((producer: Function) => {
      container.register(producer.name, producer as any);
    });
  }

  private createConsumer(consumer: Function): Consumer {
    const instance = container.resolve<Consumer>(consumer as InjectionToken);

    const { schema, hasSchema } = instance;

    if (hasSchema && !schema) {
      throw new Error(`Schema to ${consumer.name} is mandatory.`);
    }

    return instance;
  }

  private async consumeMessage(
    message: ConsumeMessage | null,
    consumer: Consumer
  ): Promise<void> {
    if (message) {
      const convertedMessage = convertToJSON(message.content);
      const content = validation(consumer.schema, convertedMessage);

      await consumer.handle(content);

      await this.channel.ack(message);
    }
  }

  private consumerErrorHandle(
    consumer: Consumer,
    message: ConsumeMessage | null,
    error: any
  ): void | null {
    const consumer_error = consumer.exception(error) as
      | ConsumerErrorOptions
      | undefined;

    const { shouldAck } = consumer_error || {};

    if (message) {
      if (shouldAck) {
        return this.channel.ack(message);
      }

      return this.channel.nack(message);
    }
    return null;
  }

  private registerConsumer(consumer: Consumer): void {
    this.channel.consume(
      consumer.queue,
      async (message: ConsumeMessage | null) => {
        try {
          await this.consumeMessage(message, consumer);
        } catch (error) {
          this.consumerErrorHandle(consumer, message, error);
        }
      }
    );
  }

  private startQueue(): void {
    this.loadConsumers().forEach((consumer: Function) => {
      const instance = this.createConsumer(consumer);

      this.registerConsumer(instance);
      logger.info(`RabbitMQ: 'Started queue '${instance.queue}' to consume`);
    });
  }

  protected startConsumers(): void {
    if (this.restarted) {
      this.startQueue();
      return;
    }

    this.event.on(ContainerEvent.Loaded, () => {
      this.startQueue();
    });
  }

  protected reconnect(): void {
    logger.warn(
      `Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`
    );

    this.restarted = true;
    this.timeout_id = setTimeout(async () => {
      await this.start();
    }, 5000);
  }

  async createChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
    container.register('v_host', { useValue: this.channel });

    this.channel.on(AMQPChannelEvent.CANCEL, () => {
      this.reconnect();
    });

    this.channel.on(AMQPChannelEvent.ERROR, error => {
      if (error.code === AMQPErrorCode.NOT_FOUND) {
        this.reconnect();
      }
    });
  }

  async start(): Promise<void> {
    try {
      clearTimeout(this.timeout_id);
      const { username, password, host, vhost } = this.config;
      this.connection = await connect(
        `${this.config.protocol}://${username}:${password}@${host}/${vhost}`
      );

      this.connection.on(AMQPConnectionEvent.CLOSE, () => {
        this.reconnect();
      });

      logger.info(`RabbitMQ: AMQP server started`);
      logger.info(
        `RabbitMQ connection established on vhost - ${this.config.vhost}`
      );
      await this.createChannel();

      this.startConsumers();
    } catch (err: any) {
      logger.error(
        `Error connecting RabbitMQ to virtual host ${this.config.vhost} : ${err.message}`
      );
      this.reconnect();
    }
  }
}
