[**Service Container Documentation**](../../README.md)

***

[Service Container Documentation](../../README.md) / [Proxiable](../README.md) / Proxiable

# Class: `abstract` Proxiable

Defined in: [Proxiable.ts:9](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/Proxiable.ts#L9)

Class representing a Proxiable.

This class allows instances to be wrapped in a Proxy, enabling custom behaviors for property access, assignment, etc.

## Author

Mr. Stone <evensstone@gmail.com>

## Extended by

- [`Container`](../../Container/classes/Container.md)

## Constructors

### Constructor

> **new Proxiable**(`handler`): `Proxiable`

Defined in: [Proxiable.ts:16](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/Proxiable.ts#L16)

Creates a Proxiable instance wrapped in a Proxy.

#### Parameters

##### handler

`ProxyHandler`\<`Proxiable`\>

A trap object for the proxy, which defines custom behavior for fundamental operations (e.g., property lookup, assignment, etc.).

#### Returns

`Proxiable`

A new proxy object for this instance.
