export abstract class Event {
  name?: string;
  timestamp: string = new Date().toISOString();
  type?: Function;
  data: any;
}

export interface EventHandle<T> {
  execute(event: T): Promise<void> | void;
}
