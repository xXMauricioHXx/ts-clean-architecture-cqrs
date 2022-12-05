export interface QueryHandle<T> {
  execute(query: T): Promise<any>;
}

export abstract class Query {
  name?: string;
  timestamp: string = new Date().toISOString();
  type?: Function;
}
