[**Service container Documentation v0.0.0**](../../README.md) • **Docs**

***

[Service container Documentation v0.0.0](../../modules.md) / [Proxiable](../README.md) / Proxiable

# Class: `abstract` Proxiable

Class representing a Proxiable.

This class allows instances to be wrapped in a Proxy, enabling custom behaviors for property access, assignment, etc.

## Author

Mr. Stone <evensstone@gmail.com>

## Extended by

- [`Container`](../../Container/classes/Container.md)

## Constructors

### new Proxiable()

> **new Proxiable**(`handler`): [`Proxiable`](Proxiable.md)

Creates a Proxiable instance wrapped in a Proxy.

#### Parameters

• **handler**: `ProxyHandler`\<[`Proxiable`](Proxiable.md)\>

A trap object for the proxy, which defines custom behavior for fundamental operations (e.g., property lookup, assignment, etc.).

#### Returns

[`Proxiable`](Proxiable.md)

A new proxy object for this instance.

#### Defined in

[Proxiable.ts:16](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Proxiable.ts#L16)
