import { container, InjectionToken } from 'tsyringe';
import { Command } from '@/core/application/ports/command';
import { Handler } from '@/core/application/ports/handler';
import { CommandEvent } from '@/adapters/ports';
import { EventEmmiter } from '@/adapters/event-emmiter/event-emmiter';
import { Event, EventHandle } from '@/core/application/ports/event';
import { Query, QueryHandle } from '@/core/application/ports';

export abstract class Mediator {
  protected event: EventEmmiter;

  constructor() {
    this.event = EventEmmiter.getInstance();
    this.event.on(
      CommandEvent.DISPATCH_COMMAND,
      this.asyncCommandResolver.bind(this)
    );
  }

  private getCommandHandleByCommand(command: Command): Handler<any> {
    const commandName = command.name!;
    const commandHandler = container.resolve<Handler<any>>(commandName);

    if (!commandHandler) {
      throw new Error(
        `Command ${command.name} not found. Please register this command in the container, puting the command in the property commandHandleMap.`
      );
    }

    return commandHandler;
  }

  private asyncCommandResolver(command: Command): void {
    const handlerInstance = this.getCommandHandleByCommand(command);
    handlerInstance.execute(command);
  }

  protected commandResolver(command: Command): Handler<any> {
    return this.getCommandHandleByCommand(command);
  }

  protected eventResolver(event: Event): EventHandle<any> {
    const eventName = event.name!;
    const eventHandle = container.resolve<EventHandle<any>>(eventName);

    if (!eventHandle) {
      throw new Error(
        `Event ${event.name} not found. Please register this event in the container, puting the event in the property eventHandleMap.`
      );
    }

    return eventHandle;
  }

  protected queryResolver(query: Query): QueryHandle<any> {
    const queryName = query.name!;
    const queryHandle = container.resolve<QueryHandle<any>>(queryName);

    if (!queryHandle) {
      throw new Error(
        `Query ${query.name} not found. Please register this query in the container, puting the event in the property queryHandleMap.`
      );
    }

    return queryHandle;
  }
}
