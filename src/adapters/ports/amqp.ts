export type RabbitMQConfig = {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
};

export enum AMQPConnectionEvent {
  CLOSE = 'close',
}

export enum AMQPChannelEvent {
  ERROR = 'error',
  CANCEL = 'cancel',
  CLOSE = 'close',
}

export enum AMQPErrorCode {
  NOT_FOUND = 404,
}
