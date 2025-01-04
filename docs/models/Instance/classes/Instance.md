[**Service Container Documentation v0.0.43**](../../../README.md)

***

[Service Container Documentation](../../../modules.md) / [models/Instance](../README.md) / Instance

# Class: Instance\<V\>

Defined in: [models/Instance.ts:14](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Instance.ts#L14)

Class representing an Instance.

This class extends the Binding class and directly holds an instance value.
It provides a straightforward resolution mechanism that simply returns the stored value.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- [`Binding`](../../Binding/classes/Binding.md)\<`V`\>

## Type Parameters

• **V** *extends* [`BindingValue`](../../../declarations/type-aliases/BindingValue.md)

The type of value that this binding holds.

## Constructors

### new Instance()

> **new Instance**\<`V`\>(`value`?): [`Instance`](Instance.md)\<`V`\>

Defined in: [models/Binding.ts:27](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Binding.ts#L27)

Create a new instance of Binding.

#### Parameters

##### value?

`V`

The value to be held by the binding.

#### Returns

[`Instance`](Instance.md)\<`V`\>

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`constructor`](../../Binding/classes/Binding.md#constructors)

## Properties

### value?

> `protected` `optional` **value**: `V`

Defined in: [models/Binding.ts:20](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Binding.ts#L20)

The value held by the binding.

This value is resolved at runtime, either directly or through a resolver function.

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`value`](../../Binding/classes/Binding.md#value-1)

## Methods

### isResolved()

> `protected` **isResolved**(): `boolean`

Defined in: [models/Binding.ts:36](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Binding.ts#L36)

Check if the value has been resolved.

#### Returns

`boolean`

A boolean indicating whether the value has been resolved.

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`isResolved`](../../Binding/classes/Binding.md#isresolved)

***

### resolve()

> **resolve**(`_container`): `undefined` \| `V`

Defined in: [models/Instance.ts:21](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Instance.ts#L21)

Resolve and return the value of the binding.

#### Parameters

##### \_container

[`Container`](../../../Container/classes/Container.md)

Container to resolve dependencies (not used in this implementation).

#### Returns

`undefined` \| `V`

The resolved value of the binding.

#### Overrides

[`Binding`](../../Binding/classes/Binding.md).[`resolve`](../../Binding/classes/Binding.md#resolve)
