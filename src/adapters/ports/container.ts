export interface Container {
  loadProviders(): Record<string, any>;

  loadConfigs(): Record<string, any>;

  loadContainer(): void;
}
