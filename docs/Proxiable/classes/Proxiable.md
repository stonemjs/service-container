[**Service Container Documentation v0.0.44**](../../README.md)

***

[Service Container Documentation](../../modules.md) / [Proxiable](../README.md) / Proxiable

# Class: `abstract` Proxiable

Defined in: [Proxiable.ts:9](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Proxiable.ts#L9)

Class representing a Proxiable.

This class allows instances to be wrapped in a Proxy, enabling custom behaviors for property access, assignment, etc.

## Author

Mr. Stone <evensstone@gmail.com>

## Extended by

- [`Container`](../../Container/classes/Container.md)

## Constructors

### new Proxiable()

> **new Proxiable**(`handler`): [`Proxiable`](Proxiable.md)

Defined in: [Proxiable.ts:16](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Proxiable.ts#L16)

Creates a Proxiable instance wrapped in a Proxy.

#### Parameters

##### handler

`ProxyHandler`\<[`Proxiable`](Proxiable.md)\>

A trap object for the proxy, which defines custom behavior for fundamental operations (e.g., property lookup, assignment, etc.).

#### Returns

[`Proxiable`](Proxiable.md)

A new proxy object for this instance.
