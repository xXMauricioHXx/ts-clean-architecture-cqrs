import { Event, Command, Query } from '@/core/application/ports';

export interface Bus {
  asyncDispatchCommand(command: Command): void;
  syncDispatchCommand(command: Command): Promise<void>;
  dispatchEvent(event: Event): Promise<void>;
  dispatchEvent(event: Event): Promise<void>;
  dispatchQuery<T>(query: Query): Promise<T>;
}
