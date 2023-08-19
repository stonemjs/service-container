**Service container Documentation v0.0.0** • [**Docs**](modules.md)

***

# Stone.js: Service Container

[![npm](https://img.shields.io/npm/l/@stone-js/service-container)](https://opensource.org/licenses/Apache-2.0)
[![npm](https://img.shields.io/npm/v/@stone-js/service-container)](https://www.npmjs.com/package/@stone-js/service-container)
[![npm](https://img.shields.io/npm/dm/@stone-js/service-container)](https://www.npmjs.com/package/@stone-js/service-container)
![Maintenance](https://img.shields.io/maintenance/yes/2024)
[![Publish Package to npmjs](https://github.com/stonemjs/service-container/actions/workflows/release.yml/badge.svg)](https://github.com/stonemjs/service-container/actions/workflows/release.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

IoC Service Container with proposal decorator, proxy resolver and destructuring injection provides a very simple, centralized container that stores and resolves libraries, objects, and values to better organize code, manage dependencies, and enhance testability.

Benefits:

- Proposal decorator, allow you to decorate any class as a Service that must auto bind to the service container
- Proxy resolver, Allow you to resolve any class denpendencies as own property of the container instance
- Destructuring injection or Destructuring resolver, allow you to use dependencies in your class constructor using destructured parameter
- Autobinding, allow to bind any class with zero configuration
- Defers dependency resolution to mitigate circular references

---

Get started with the [documentation](https://stonejs.com/cookbook/service-container).

## Contributing

See [Contributing Guide](https://github.com/stonemjs/service-container/blob/main/CONTRIBUTING.md).

## Credits
- [Laravel Service Container](https://github.com/illuminate/container)
- [Halligan JS: Service Container](https://github.com/halliganjs/service-container)
