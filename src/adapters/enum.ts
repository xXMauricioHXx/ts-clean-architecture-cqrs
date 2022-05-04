export enum ContainerEvent {
  Loaded = 'CONTAINER_LOADED',
}

export enum Event {
  DeletePerson = 'DELETE_PERSON',
}

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
