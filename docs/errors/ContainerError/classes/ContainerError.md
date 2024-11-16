[**Service Container Documentation v0.0.41**](../../../README.md) • **Docs**

***

[Service Container Documentation v0.0.41](../../../modules.md) / [errors/ContainerError](../README.md) / ContainerError

# Class: ContainerError

Class representing a ContainerError.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- `Error`

## Constructors

### new ContainerError()

> **new ContainerError**(`type`, `message`): [`ContainerError`](ContainerError.md)

Create a ContainerError.

#### Parameters

• **type**: `string`

The type of the error.

• **message**: [`BindingKey`](../../../declarations/type-aliases/BindingKey.md)

The error message or key related to the error.

#### Returns

[`ContainerError`](ContainerError.md)

#### Overrides

`Error.constructor`

#### Defined in

[errors/ContainerError.ts:55](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L55)

## Properties

### ALIAS\_TYPE

> `readonly` `static` **ALIAS\_TYPE**: `"alias"` = `'alias'`

Error type indicating an alias conflict.

#### Defined in

[errors/ContainerError.ts:12](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L12)

***

### ALIAS\_UNBOUND\_TYPE

> `readonly` `static` **ALIAS\_UNBOUND\_TYPE**: `"alias_unbound"` = `'alias_unbound'`

Error type indicating an attempt to alias an unbound value.

#### Defined in

[errors/ContainerError.ts:27](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L27)

***

### CANNOT\_RESOLVE\_TYPE

> `readonly` `static` **CANNOT\_RESOLVE\_TYPE**: `"cannot_resolve"` = `'cannot_resolve'`

Error type indicating an error thrown by the resolver function.

#### Defined in

[errors/ContainerError.ts:37](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L37)

***

### CIRCULAR\_DEPENDENCY\_TYPE

> `readonly` `static` **CIRCULAR\_DEPENDENCY\_TYPE**: `"circular_dependency"` = `'circular_dependency'`

Error type indicating a circular dependency.

#### Defined in

[errors/ContainerError.ts:42](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L42)

***

### NOT\_A\_SERVICE\_TYPE

> `readonly` `static` **NOT\_A\_SERVICE\_TYPE**: `"not_a_service"` = `'not_a_service'`

Error type indicating that a value is not a service.

#### Defined in

[errors/ContainerError.ts:32](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L32)

***

### RESOLUTION\_TYPE

> `readonly` `static` **RESOLUTION\_TYPE**: `"resolution"` = `'resolution'`

Error type indicating a resolution failure.

#### Defined in

[errors/ContainerError.ts:22](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L22)

***

### RESOLVER\_TYPE

> `readonly` `static` **RESOLVER\_TYPE**: `"resolver"` = `'resolver'`

Error type indicating that the resolver is not a function.

#### Defined in

[errors/ContainerError.ts:17](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/errors/ContainerError.ts#L17)
