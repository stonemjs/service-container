[**Service Container Documentation v0.0.43**](../../../README.md)

***

[Service Container Documentation](../../../modules.md) / [models/Factory](../README.md) / Factory

# Class: Factory\<V\>

Defined in: [models/Factory.ts:15](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Factory.ts#L15)

Class representing a Factory.

The Factory class extends the ResolverBinding class, providing a mechanism to resolve a new instance each time the binding is resolved.
This ensures that a fresh instance is created with each call to the `resolve` method.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- [`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md)\<`V`\>

## Type Parameters

• **V** *extends* [`BindingValue`](../../../declarations/type-aliases/BindingValue.md)

The type of value that this binding holds.

## Constructors

### new Factory()

> **new Factory**\<`V`\>(`resolver`): [`Factory`](Factory.md)\<`V`\>

Defined in: [models/ResolverBinding.ts:28](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/ResolverBinding.ts#L28)

Create a new instance of ResolverBinding.

#### Parameters

##### resolver

[`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the binding value.

#### Returns

[`Factory`](Factory.md)\<`V`\>

#### Throws

ContainerError if the resolver is not a function.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`constructor`](../../ResolverBinding/classes/ResolverBinding.md#constructors)

## Properties

### resolver

> `protected` `readonly` **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

Defined in: [models/ResolverBinding.ts:20](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/ResolverBinding.ts#L20)

The resolver function used to provide the binding value.

This function will be called when the value is needed, allowing for lazy instantiation
and dependency resolution. It should return an instance of type `V`.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`resolver`](../../ResolverBinding/classes/ResolverBinding.md#resolver-1)

***

### value?

> `protected` `optional` **value**: `V`

Defined in: [models/Binding.ts:20](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Binding.ts#L20)

The value held by the binding.

This value is resolved at runtime, either directly or through a resolver function.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`value`](../../ResolverBinding/classes/ResolverBinding.md#value)

## Methods

### isResolved()

> `protected` **isResolved**(): `boolean`

Defined in: [models/Binding.ts:36](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Binding.ts#L36)

Check if the value has been resolved.

#### Returns

`boolean`

A boolean indicating whether the value has been resolved.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`isResolved`](../../ResolverBinding/classes/ResolverBinding.md#isresolved)

***

### resolve()

> **resolve**(`container`): `V`

Defined in: [models/Factory.ts:26](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Factory.ts#L26)

Resolve and return the value of the binding.

Each time this method is called, a new value is resolved using the resolver function.
This is intended for cases where a fresh instance is required for each resolution, such as factories or transient dependencies.

#### Parameters

##### container

[`Container`](../../../Container/classes/Container.md)

The container to resolve dependencies from.

#### Returns

`V`

The resolved value of the binding.

#### Throws

ContainerError if the value cannot be resolved.

#### Overrides

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`resolve`](../../ResolverBinding/classes/ResolverBinding.md#resolve)
