import logger from '@/logger';
import { CommandEvent } from '@/adapters/ports';
import { Event } from '@/core/application/ports/event';
import { Mediator } from '@/adapters/cqrs-bus/mediator';
import { Command } from '@/core/application/ports/command';
import { EventRegister } from '@/adapters/cqrs-bus/event-register';
import { Bus } from '@/core/domain/commands/bus';
import { Query } from '@/core/application/ports/query';

export class CRQSBus extends Mediator implements Bus {
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

  async dispatchQuery<T>(query: Query): Promise<T> {
    logger.info(`Query ${query.name} was dispatched`);
    const queryHandle = this.queryResolver(query);

    return queryHandle.execute(query);
  }
}
