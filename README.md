# StoneJS: Service Container

![npm](https://img.shields.io/npm/l/@stone-js/service-container)
![npm](https://img.shields.io/npm/v/@stone-js/service-container)
![npm](https://img.shields.io/npm/dm/@stone-js/service-container)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

IoC Service Container with proposal decorator, proxy resolver and destructuring injection provides a very simple, centralized container that stores and resolves libraries, objects, and values to better organize code, manage dependencies, and enhance testability.

Benefits:

- Proposal decorator, allow you to decorate any class as a Service that must auto bind to the service container
- Proxy resolver, Allow you to resolve any class denpendencies as own property of the container instance
- Destructuring injection or Destructuring resolver, allow you to use dependencies in your class constructor using destructured parameter
- Autobinding, allow to bind any class with zero configuration
- Defers dependency resolution to mitigate circular references

## Table of Contents

* [Installation](#installation)

## Installation

The Service Container can be installed with both `npm` and `yarn`.

```sh
# Install with NPM
$ npm i @stone-js/service-container

# Install with yarn
$ yarn add @stone-js/service-container
```

---

## Credits
- [Laravel Service Container](https://github.com/illuminate/container)
- [Halligan JS: Service Container](https://github.com/halliganjs/service-container)