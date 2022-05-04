export type ConsumerErrorOptions = {
  shouldAck: boolean;
};

export type AmqpRequest = {
  body: any;
};

export abstract class Consumer {
  abstract handle(data: AmqpRequest): void;
  abstract exception(error: Error): ConsumerErrorOptions;

  queue: string;
  schema: any;
  hasSchema: boolean;
}
