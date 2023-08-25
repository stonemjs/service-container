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