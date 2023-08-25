export interface Container {
  bindings: Map<any, any>;
  instance (key: any, value: any): Container;
  singleton (key: any, value: Function): Container;
  binding (key: any, value: Function): Container;
  make (key: any): any;
  provider (ProviderClass: Provider): Container;
  clear (): Container;
  discovering(services: any[]): Container
}

export interface Provider {
  register (): void;
  boot (): void;
}

export interface DecoratorDependency {
  name: string;
  value: any;
}

export interface DecoratorConfig {
  type?: string;
  singleton?: boolean;
  dependencies?: Array<DecoratorDependency>;
}

export type Service = (arg: DecoratorConfig) => any;

export type ServiceProvider = (arg: any) => any;