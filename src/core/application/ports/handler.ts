export interface Handler<T> {
  execute(command: T): Promise<void>;
}
