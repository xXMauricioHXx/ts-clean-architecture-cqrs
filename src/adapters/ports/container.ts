export interface Container {
  loadProviders(): Record<string, any>;

  loadConfigs(): Record<string, any>;

  loadContainer(): void;
}

export enum ContainerEvent {
  Loaded = 'CONTAINER_LOADED',
}
