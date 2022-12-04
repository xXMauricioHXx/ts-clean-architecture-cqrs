import { container, InjectionToken } from 'tsyringe';
import { Command } from '@/core/application/ports/command';
import { Handler } from '@/core/application/ports/handler';
import { CommandBusConfig, CommandEvent } from '@/adapters/ports';
import { EventEmmiter } from '@/adapters/event-emmiter/event-emmiter';
import { Event, EventHandle } from '@/core/application/ports/event';

export abstract class Mediator {
  protected event: EventEmmiter;

  constructor(protected commandBusConfig: CommandBusConfig) {
    this.event = EventEmmiter.getInstance();
    this.event.on(
      CommandEvent.DISPATCH_COMMAND,
      this.asyncCommandResolver.bind(this)
    );
  }

  private getHandleByCommand(command: Command): Handler<any> {
    const { commandHandleMap } = this.commandBusConfig;

    const commandName = command.name!;
    const handler = commandHandleMap[commandName] as InjectionToken;

    if (!handler) {
      throw new Error(
        `Command ${command.name} not found. Please register this command in the container, puting the command in the property commandHandleMap.`
      );
    }

    return container.resolve(handler) as Handler<any>;
  }

  private asyncCommandResolver(command: Command): void {
    const handlerInstance = this.getHandleByCommand(command);
    handlerInstance.execute(command);
  }

  private registerEvent(event: Event) {}

  protected commandResolver(command: Command): Handler<any> {
    return this.getHandleByCommand(command);
  }

  protected eventResolver(event: Event): EventHandle<any> {
    const { eventHandleMap } = this.commandBusConfig;
    const eventName = event.name!;
    const eventHandle = eventHandleMap[eventName] as InjectionToken;

    if (!eventHandle) {
      throw new Error(
        `Event ${event.name} not found. Please register this event in the container, puting the event in the property eventHandleMap.`
      );
    }

    return container.resolve(eventHandle) as EventHandle<any>;
  }
}
