[**Service container Documentation v0.0.0**](../../../README.md) • **Docs**

***

[Service container Documentation v0.0.0](../../../modules.md) / [models/Instance](../README.md) / Instance

# Class: Instance\<V\>

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

Create a new instance of Binding.

#### Parameters

• **value?**: `V`

The value to be held by the binding.

#### Returns

[`Instance`](Instance.md)\<`V`\>

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`constructor`](../../Binding/classes/Binding.md#constructors)

#### Defined in

[models/Binding.ts:27](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/Binding.ts#L27)

## Properties

### value?

> `protected` `optional` **value**: `V`

The value held by the binding.

This value is resolved at runtime, either directly or through a resolver function.

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`value`](../../Binding/classes/Binding.md#value)

#### Defined in

[models/Binding.ts:20](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/Binding.ts#L20)

## Methods

### isResolved()

> `protected` **isResolved**(): `boolean`

Check if the value has been resolved.

#### Returns

`boolean`

A boolean indicating whether the value has been resolved.

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`isResolved`](../../Binding/classes/Binding.md#isresolved)

#### Defined in

[models/Binding.ts:36](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/Binding.ts#L36)

***

### resolve()

> **resolve**(`_container`): `undefined` \| `V`

Resolve and return the value of the binding.

#### Parameters

• **\_container**: [`Container`](../../../Container/classes/Container.md)

Container to resolve dependencies (not used in this implementation).

#### Returns

`undefined` \| `V`

The resolved value of the binding.

#### Overrides

[`Binding`](../../Binding/classes/Binding.md).[`resolve`](../../Binding/classes/Binding.md#resolve)

#### Defined in

[models/Instance.ts:21](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/Instance.ts#L21)
