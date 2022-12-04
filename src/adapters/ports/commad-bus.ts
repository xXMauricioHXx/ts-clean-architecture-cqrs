export enum CommandEvent {
  DISPATCH_COMMAND = 'DISPATCH_COMMAND',
}

export type CommandHandleMap = Record<string, Function>;
export type EventHandleMap = Record<string, Function>;

export type CommandBusConfig = {
  commandHandleMap: CommandHandleMap;
  eventHandleMap: EventHandleMap;
};
