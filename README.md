# Stone.js: Service Container

[![npm](https://img.shields.io/npm/l/@stone-js/service-container)](https://opensource.org/licenses/Apache-2.0)
[![npm](https://img.shields.io/npm/v/@stone-js/service-container)](https://www.npmjs.com/package/@stone-js/service-container)
[![npm](https://img.shields.io/npm/dm/@stone-js/service-container)](https://www.npmjs.com/package/@stone-js/service-container)
![Maintenance](https://img.shields.io/maintenance/yes/2024)
[![Publish Package to npmjs](https://github.com/stonemjs/service-container/actions/workflows/release.yml/badge.svg)](https://github.com/stonemjs/service-container/actions/workflows/release.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

IoC Service Container with proposal decorator, proxy resolver and destructuring injection provides a very simple, centralized container that stores and resolves libraries, objects, and values to better organize code, manage dependencies, and enhance testability.

---

## Synopsis

`Service Container` is a cutting-edge JavaScript/TypeScript tool designed to revolutionize the way you manage dependencies in your applications. By implementing the Inversion of Control (IoC) pattern, this library facilitates seamless dependency injection, allowing you to build highly decoupled and maintainable codebases.

Dependency Injection (DI) is a design pattern used to implement IoC, wherein objects are given their dependencies rather than creating them internally. This approach enhances testability, reduces code duplication, and promotes adherence to the Single Responsibility Principle by allowing objects to focus solely on their core responsibilities.

`Service Container` not only leverages the power of DI but also implements the Proxy pattern. This innovative feature allows you to resolve dependencies as if they were properties of the service container instance itself, and combined with destructuring, it enables immediate benefits from dependency injection by destructuring. This means you can access dependencies with minimal boilerplate code, making your development process more intuitive and efficient.

With the `Service Container,` you can effortlessly register, resolve, and manage dependencies, ensuring your applications are both scalable and easy to maintain. Whether you are working on a small project or a large enterprise application, this library provides the robust foundation needed to keep your code clean, modular, and testable.

## Installation

To install the `Service container` utility, you need to add it to your project. Assuming it’s part of a package you manage.

NPM:

```bash
npm i @stone-js/service-container
```

Yarn:

```bash
yarn add @stone-js/service-container
```

PNPM:

```bash
pnpm add @stone-js/service-container
```

The `Container` module can only be imported via ESM import syntax:

```typescript
import { Container } from '@stone-js/service-container';
```

## Getting Started

To get started with the `Service Container`, you need to import the `Container` class and create an instance of it. This instance will act as the central registry for all your dependencies in your application.

Let's begin with a simple example to discover the power of the service container by logging a message.

### 1. Create the `Logger` Class

First, create a simple `Logger` class to log messages:

```typescript
// Your Logger class
class Logger {
  log(message: string) {
    console.log(message);
  }
}
```

### 2. Create the Class that Provides the Message

Next, create a class `A` that provides a message to be logged:

```typescript
// Your class A
class A {
  getMessage(): string {
    return 'Hello World!';
  }
}
```

### 3. Create the Class that Logs the Message Using the Logger

Now, create a class `B` that depends on `Logger` and `A` to log the message:

```typescript
import { Binding } from '@stone-js/service-container';

// Your class B
class B {
  private readonly a: A;
  private readonly logger: Logger;

  constructor({ a, logger }: Binding<A | Logger>) { // Dependency injection by destructuring
    this.a = a as A;
    this.logger = logger as Logger;
  }

  logMessage() {
    this.logger.log(this.a.getMessage());
  }
}
```

### 4. Use the Container to Manage Dependencies

Finally, create an instance of the `Container` class and use it to manage these dependencies:

```typescript
import { Container } from '@stone-js/service-container';

// Create a container instance
const container = new Container();

// Auto-register components
container
  .autoBinding(A)
  .autoBinding(B)
  .autoBinding(Logger)
  .alias(A, 'a')
  .alias(B, 'b')
  .alias(Logger, 'logger');

// Make B instance
const b = container.make(B);

// Call logMessage method
b.logMessage(); // Output: Hello World!
```

In this guide, we covered how to define and register dependencies using the `Container` class, and how to leverage dependency injection through destructuring and the Proxy pattern.

By following these steps, you can effectively manage dependencies in your applications, making them more modular, testable, and maintainable.

## Usage

The true power of Stone Service Container lies in its ability to simplify and enhance the management of dependencies within your application. By leveraging the Inversion of Control (IoC) and Proxy patterns, the library offers a highly flexible and intuitive way to bind, resolve, and inject dependencies. Whether you're working with simple instances, complex singletons, or dynamic factories, the Service Container provides a robust foundation for building scalable and maintainable applications.

### Binding

You can bind instances, singletons, and factories to the container using various methods provided by the `Container` class.

#### Instance

To bind a single instance or value to the container:

```typescript
// Bind value
container.instance('config', { apiUrl: 'https://api.example.com' });

// Bind instance
container.instance('ApiUrl', new URL('https://api.example.com'));
```

#### Singleton

To bind a resolver function that returns a singleton instance:

```typescript
// Bind a singleton using a resolver function
container.singleton('logger', () => new Logger());

// Resolve the singleton (same instance every time)
const logger1 = container.make('logger');
const logger2 = container.make('logger');
console.log(logger1 === logger2); // Should output: true
```

#### Factory

To bind a resolver function that returns a new instance each time:

```typescript
// To bind a resolver function that returns a new instance each time
container.binding('userService', () => new UserService());
```

### Auto Binding

The `autoBinding` method in the service container simplifies the process of binding dependencies by ensuring they are only bound if not already present in the container. This method can be used implicitly or explicitly, providing flexibility in how dependencies are registered and resolved.

#### Implicit Auto Binding

Implicit auto binding allows you to automatically register and bind a class to the container using the class's own name. This approach simplifies dependency management by using the class name as the key for resolution.

```typescript
// Auto binding Logger
container.autoBinding(Logger);

// Resolve Logger (it will be registered implicitly if not found)
const logger = container.make('Logger'); // Prefer to use a string key for clarity.
```

#### Explicit Auto Binding

Explicit auto binding allows you to register and bind a class to the container with a specified key, as a singleton or factory, and with optional aliases. This method offers greater flexibility in naming and accessing dependencies.

```typescript
// Auto binding Logger with specified key and aliases
container.autoBinding('logger', Logger, true, ['logging', 'log']);

// Resolve Logger using different aliases
const logger = container.make('logger');
const loggerByAlias = container.make('logging');
```

### Conditional Binding

You can bind instances, singletons, and factories to the container conditionally using various methods provided by the `Container` class.

#### Instance

To bind a single instance or value to the container, if it is not already bound:

```typescript
// Bind value conditionally
container.instanceIf('config', { apiUrl: 'https://api.example.com' });

// Bind instance conditionally
container.instanceIf('ApiUrl', new URL('https://api.example.com'));
```

#### Singleton

To bind a resolver function that returns a singleton instance, if it is not already bound:

```typescript
container.singletonIf('logger', () => new Logger());
```

#### Factory

To bind a resolver function that returns a new instance each time, if it is not already bound:

```typescript
container.bindingIf('userService', () => new UserService());
```

### Resolving Dependencies

You can resolve dependencies from the container using the `make` method:

```typescript
const config = container.make('config');
const logger = container.make('logger');
const userService = container.make('userService');
```

### On-Demand Resolving

This method provides a convenient way to resolve a value from the container by its key and return it wrapped in a factory function. This approach is useful when you need to create multiple instances of a dependency on demand.

```typescript
// Get the logger factory function
const loggerFactory = container.factory('logger');

// Resolve logger on demand
const logger = loggerFactory();
```

### Conditional Resolving

This method checks if the dependency is already bound in the container. If it is, the dependency is resolved. If not, the method binds the dependency and then resolves it. This ensures that dependencies are always available when needed, without redundant bindings.

```typescript
// Assuming Logger is a class that we want to ensure is bound and resolved
container.resolve('Logger', true);

// Resolve the logger instance
const logger = container.make('Logger');
```

### Using Aliases

Aliases allow you to reference bindings by alternative names.

#### Setting Aliases

To set an alias for a binding:

```typescript
// Set an alias for Logger
container.alias(Logger, ['logger', 'logging', 'log']);
```

#### Retrieving Aliases

To retrieve a binding by its alias:

```typescript
const logger = container.make('logging');
```

### Checking Bindings

You can check if a binding or alias exists in the container:

```typescript
// With bound method
const hasLogger = container.bound(Logger); // true

// Can be used with alias
const hasLoggerAlias = container.bound('logging'); // true

// An alias of bound method
const hasLoggerAliasUsingHas = container.has(Logger); // true

// Check if this alias exists
const isAlias = container.isAlias('logging'); // true
```

### Clearing the Container

To remove all bindings and reset the container:

```typescript
// Clear all bindings and aliases
container.clear();
```

With this library, managing dependencies in your application becomes much simpler and more efficient. By adhering to the principles of Inversion of Control and Dependency Injection, you can create more modular, testable, and maintainable code.


## Summary

The Stone Service Container provides a powerful, flexible, and intuitive approach to managing dependencies in your applications. By adhering to the principles of Inversion of Control (IoC) and leveraging both the Proxy and Dependency Injection patterns, the service container allows for clean, modular, and maintainable code.

### Key Features Covered:

- **Binding Dependencies**: We explored how to bind instances, singletons, and factories to the container. These different binding methods help you manage your application's lifecycle effectively, ensuring dependencies are shared or instantiated as needed.

- **Auto Binding and Conditional Binding**: We discussed how to use the `autoBinding` method to automatically bind classes and the various methods for conditional binding, enabling flexibility in dependency management while reducing redundant configurations.

- **Resolving Dependencies**: You learned how to resolve dependencies from the container using the `make` method, as well as how to use proxy-based and conditional resolving to simplify dependency management and ensure a streamlined workflow.

- **Aliases**: Setting up aliases for bindings provides an extra level of flexibility by allowing you to reference dependencies using alternative names, making code readability and access even more straightforward.

- **Dependency Management and Injection**: Throughout the examples, we saw how the service container centralizes the dependency management process, allowing for easy injection and control over your application's objects and services.

### Why Use the Stone Service Container?

By using the Stone Service Container, you can make your application more:
- **Modular**: With dependencies being managed centrally, you can easily swap implementations without changing client code.
- **Testable**: Dependencies can be easily mocked or replaced during testing, improving test coverage and quality.
- **Maintainable**: With a clear separation of concerns, your codebase is easier to maintain, reducing technical debt over time.

The service container is well-suited for applications of all sizes, providing structure and scalability, ensuring that as your project grows, dependency management remains effortless and effective.

### Next Steps

To further explore the capabilities of the Stone Service Container, consider:
- Integrating it with a real-world project to experience its full power in managing complex dependency graphs.
- Utilizing advanced features such as custom providers and lifecycle hooks for fine-grained control.

With these tools at your disposal, you are ready to create clean, robust, and scalable applications by embracing the full potential of dependency injection and IoC patterns.

## API documentation

- [API](https://github.com/stonemjs/service-container/blob/main/docs/modules.md)

## Contributing

See [Contributing Guide](https://github.com/stonemjs/service-container/blob/main/CONTRIBUTING.md).

## Credits
- [Laravel Service Container](https://github.com/illuminate/container)
- [Halligan JS: Service Container](https://github.com/halliganjs/service-container)