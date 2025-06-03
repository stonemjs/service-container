[**Service Container Documentation**](../../../README.md)

***

[Service Container Documentation](../../../README.md) / [models/Binding](../README.md) / Binding

# Class: `abstract` Binding\<V\>

Defined in: [models/Binding.ts:14](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/models/Binding.ts#L14)

Abstract class representing a Binding.

This abstract class serves as the base class for all types of bindings in the service container. It holds a value and provides an abstract method
to resolve and return that value, allowing different subclasses to implement their own resolution logic. Bindings are used to manage dependencies
and control how objects are instantiated within the container.

## Author

Mr. Stone <evensstone@gmail.com>

## Extended by

- [`Instance`](../../Instance/classes/Instance.md)
- [`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md)

## Type Parameters

### V

`V` *extends* [`BindingValue`](../../../declarations/type-aliases/BindingValue.md)

The type of value that this binding holds.

## Constructors

### Constructor

> **new Binding**\<`V`\>(`value?`): `Binding`\<`V`\>

Defined in: [models/Binding.ts:27](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/models/Binding.ts#L27)

Create a new instance of Binding.

#### Parameters

##### value?

`V`

The value to be held by the binding.

#### Returns

`Binding`\<`V`\>

## Properties

### value?

> `protected` `optional` **value**: `V`

Defined in: [models/Binding.ts:20](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/models/Binding.ts#L20)

The value held by the binding.

This value is resolved at runtime, either directly or through a resolver function.

## Methods

### isResolved()

> `protected` **isResolved**(): `boolean`

Defined in: [models/Binding.ts:36](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/models/Binding.ts#L36)

Check if the value has been resolved.

#### Returns

`boolean`

A boolean indicating whether the value has been resolved.

***

### resolve()

> `abstract` **resolve**(`container`): `undefined` \| `V`

Defined in: [models/Binding.ts:48](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/models/Binding.ts#L48)

Resolve and return the value of the binding.

This abstract method must be implemented by subclasses to provide specific resolution logic.

#### Parameters

##### container

[`Container`](../../../Container/classes/Container.md)

The container to resolve dependencies from.

#### Returns

`undefined` \| `V`

The resolved value of the binding.
