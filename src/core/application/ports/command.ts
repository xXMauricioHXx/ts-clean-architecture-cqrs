export abstract class Command {
  name?: string;
  timestamp: string = new Date().toISOString();
  type?: Function;
}
