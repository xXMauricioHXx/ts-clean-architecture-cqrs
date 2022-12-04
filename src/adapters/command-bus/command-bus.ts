import logger from '@/logger';
import { CommandEvent } from '@/adapters/ports';
import { Event } from '@/core/application/ports/event';
import { Mediator } from '@/adapters/command-bus/mediator';
import { Command } from '@/core/application/ports/command';
import { CommandBus } from '@/core/domain/commands/command-bus';
import { EventRegister } from '@/adapters/command-bus/event-register';

export class Bus extends Mediator implements CommandBus {
  asyncDispatchCommand(command: Command): void {
    this.event.emit(CommandEvent.DISPATCH_COMMAND, command);
    logger.info(`Command ${command.name} was dispatched`);
  }

  async syncDispatchCommand(command: Command): Promise<void> {
    logger.info(`Command ${command.name} was dispatched`);
    const handler = this.commandResolver(command);
    await handler.execute(command);
  }

  async dispatchEvent(event: Event): Promise<void> {
    logger.info(`Event ${event.name} was dispatched`);
    const eventHandle = this.eventResolver(event);
    await eventHandle.execute(event);
    EventRegister.register(event);
  }
}
