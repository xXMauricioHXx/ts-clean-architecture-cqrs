import 'reflect-metadata';
import { validateOrReject } from 'class-validator';
import { env } from '@/main/env';
import { EventEmmiter } from '@/adapters';
import { HttpServer, Module } from '@/main/modules';
import { AppContainer } from '@/main/container/app-container';
import { ContainerEvent } from '@/adapters/ports';

export class Application {
  protected loadModules(): Module[] {
    return [new HttpServer()];
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
