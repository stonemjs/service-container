[**Service Container Documentation v0.0.43**](../../../README.md) • **Docs**

***

[Service Container Documentation v0.0.43](../../../modules.md) / [models/Singleton](../README.md) / Singleton

# Class: Singleton\<V\>

Class representing a Singleton.

The Singleton class extends the ResolverBinding class, ensuring that the value is only resolved once.
Subsequent calls to the `resolve` method will return the previously resolved value, making it behave as a singleton.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- [`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md)\<`V`\>

## Type Parameters

• **V** *extends* [`BindingValue`](../../../declarations/type-aliases/BindingValue.md)

The type of value that this binding holds.

## Constructors

### new Singleton()

> **new Singleton**\<`V`\>(`resolver`): [`Singleton`](Singleton.md)\<`V`\>

Create a new instance of ResolverBinding.

#### Parameters

• **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the binding value.

#### Returns

[`Singleton`](Singleton.md)\<`V`\>

#### Throws

ContainerError if the resolver is not a function.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`constructor`](../../ResolverBinding/classes/ResolverBinding.md#constructors)

#### Defined in

[models/ResolverBinding.ts:28](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/models/ResolverBinding.ts#L28)

## Properties

### resolver

> `protected` `readonly` **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function used to provide the binding value.

This function will be called when the value is needed, allowing for lazy instantiation
and dependency resolution. It should return an instance of type `V`.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`resolver`](../../ResolverBinding/classes/ResolverBinding.md#resolver)

#### Defined in

[models/ResolverBinding.ts:20](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/models/ResolverBinding.ts#L20)

***

### value?

> `protected` `optional` **value**: `V`

The value held by the binding.

This value is resolved at runtime, either directly or through a resolver function.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`value`](../../ResolverBinding/classes/ResolverBinding.md#value)

#### Defined in

[models/Binding.ts:20](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/models/Binding.ts#L20)

## Methods

### isResolved()

> `protected` **isResolved**(): `boolean`

Check if the value has been resolved.

#### Returns

`boolean`

A boolean indicating whether the value has been resolved.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`isResolved`](../../ResolverBinding/classes/ResolverBinding.md#isresolved)

#### Defined in

[models/Binding.ts:36](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/models/Binding.ts#L36)

***

### resolve()

> **resolve**(`container`): `undefined` \| `V`

Resolve and return the value of the binding.

If the value has already been resolved, return the cached value. Otherwise, use the resolver function
to resolve the value, store it, and return it.

#### Parameters

• **container**: [`Container`](../../../Container/classes/Container.md)

The container to resolve dependencies from.

#### Returns

`undefined` \| `V`

The resolved value of the binding.

#### Throws

ContainerError if the value cannot be resolved.

#### Overrides

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`resolve`](../../ResolverBinding/classes/ResolverBinding.md#resolve)

#### Defined in

[models/Singleton.ts:26](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/models/Singleton.ts#L26)
