[**Service Container Documentation**](../../../README.md)

***

[Service Container Documentation](../../../README.md) / [errors/ContainerError](../README.md) / ContainerError

# Class: ContainerError

Defined in: [errors/ContainerError.ts:8](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L8)

Class representing a ContainerError.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- `Error`

## Constructors

### Constructor

> **new ContainerError**(`type`, `message`): `ContainerError`

Defined in: [errors/ContainerError.ts:55](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L55)

Create a ContainerError.

#### Parameters

##### type

`string`

The type of the error.

##### message

[`BindingKey`](../../../declarations/type-aliases/BindingKey.md)

The error message or key related to the error.

#### Returns

`ContainerError`

#### Overrides

`Error.constructor`

## Properties

### ALIAS\_TYPE

> `readonly` `static` **ALIAS\_TYPE**: `"alias"` = `'alias'`

Defined in: [errors/ContainerError.ts:12](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L12)

Error type indicating an alias conflict.

***

### ALIAS\_UNBOUND\_TYPE

> `readonly` `static` **ALIAS\_UNBOUND\_TYPE**: `"alias_unbound"` = `'alias_unbound'`

Defined in: [errors/ContainerError.ts:27](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L27)

Error type indicating an attempt to alias an unbound value.

***

### CANNOT\_RESOLVE\_TYPE

> `readonly` `static` **CANNOT\_RESOLVE\_TYPE**: `"cannot_resolve"` = `'cannot_resolve'`

Defined in: [errors/ContainerError.ts:37](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L37)

Error type indicating an error thrown by the resolver function.

***

### CIRCULAR\_DEPENDENCY\_TYPE

> `readonly` `static` **CIRCULAR\_DEPENDENCY\_TYPE**: `"circular_dependency"` = `'circular_dependency'`

Defined in: [errors/ContainerError.ts:42](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L42)

Error type indicating a circular dependency.

***

### NOT\_A\_SERVICE\_TYPE

> `readonly` `static` **NOT\_A\_SERVICE\_TYPE**: `"not_a_service"` = `'not_a_service'`

Defined in: [errors/ContainerError.ts:32](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L32)

Error type indicating that a value is not a service.

***

### RESOLUTION\_TYPE

> `readonly` `static` **RESOLUTION\_TYPE**: `"resolution"` = `'resolution'`

Defined in: [errors/ContainerError.ts:22](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L22)

Error type indicating a resolution failure.

***

### RESOLVER\_TYPE

> `readonly` `static` **RESOLVER\_TYPE**: `"resolver"` = `'resolver'`

Defined in: [errors/ContainerError.ts:17](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/errors/ContainerError.ts#L17)

Error type indicating that the resolver is not a function.
