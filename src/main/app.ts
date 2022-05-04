import 'reflect-metadata';
import { validateOrReject } from 'class-validator';
import { env } from '@/main/env';
import { EventEmmiter } from '@/adapters';
import { HttpServer, Module, AMQPServer } from '@/main/modules';
import { AppContainer } from '@/main/container/app-container';
import { ContainerEvent } from '@/adapters/enum';

export class Application {
  protected loadModules(): Module[] {
    return [
      new AMQPServer({
        host: env.rabbitMQHost,
        password: env.rabbitMQPassword,
        port: env.rabbitMQPort,
        protocol: env.rabbitMQProtocol,
        username: env.rabbitMQUsername,
        vhost: env.rabbitMQVHost,
      }),
      new HttpServer(),
    ];
  }

  async start() {
    await validateOrReject(env);

    const appContainer = new AppContainer();
    appContainer.loadContainer();

    for (const module of this.loadModules()) {
      await module.start();
    }

    const eventEmmiter = EventEmmiter.getInstance();
    eventEmmiter.emit(ContainerEvent.Loaded);
  }
}
