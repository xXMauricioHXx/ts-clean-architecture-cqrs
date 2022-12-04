import { Command } from '@/core/application/ports/command';
import { Event } from '@/core/application/ports/event';

export interface CommandBus {
  asyncDispatchCommand(command: Command): void;
  syncDispatchCommand(command: Command): Promise<void>;
  dispatchEvent(event: Event): Promise<void>;
}
