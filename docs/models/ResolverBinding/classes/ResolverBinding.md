[**Service Container Documentation v0.0.43**](../../../README.md)

***

[Service Container Documentation](../../../modules.md) / [models/ResolverBinding](../README.md) / ResolverBinding

# Class: `abstract` ResolverBinding\<V\>

Defined in: [models/ResolverBinding.ts:13](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/ResolverBinding.ts#L13)

Class representing a ResolverBinding.

This class extends the Binding class, using a resolver function to lazily resolve the value when needed.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- [`Binding`](../../Binding/classes/Binding.md)\<`V`\>

## Extended by

- [`Factory`](../../Factory/classes/Factory.md)
- [`Singleton`](../../Singleton/classes/Singleton.md)

## Type Parameters

• **V** *extends* [`BindingValue`](../../../declarations/type-aliases/BindingValue.md)

The type of value that this binding holds.

## Constructors

### new ResolverBinding()

> **new ResolverBinding**\<`V`\>(`resolver`): [`ResolverBinding`](ResolverBinding.md)\<`V`\>

Defined in: [models/ResolverBinding.ts:28](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/ResolverBinding.ts#L28)

Create a new instance of ResolverBinding.

#### Parameters

##### resolver

[`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the binding value.

#### Returns

[`ResolverBinding`](ResolverBinding.md)\<`V`\>

#### Throws

ContainerError if the resolver is not a function.

#### Overrides

[`Binding`](../../Binding/classes/Binding.md).[`constructor`](../../Binding/classes/Binding.md#constructors)

## Properties

### resolver

> `protected` `readonly` **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

Defined in: [models/ResolverBinding.ts:20](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/ResolverBinding.ts#L20)

The resolver function used to provide the binding value.

This function will be called when the value is needed, allowing for lazy instantiation
and dependency resolution. It should return an instance of type `V`.

***

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

> `abstract` **resolve**(`container`): `undefined` \| `V`

Defined in: [models/Binding.ts:48](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/models/Binding.ts#L48)

Resolve and return the value of the binding.

This abstract method must be implemented by subclasses to provide specific resolution logic.

#### Parameters

##### container

[`Container`](../../../Container/classes/Container.md)

The container to resolve dependencies from.

#### Returns

`undefined` \| `V`

The resolved value of the binding.

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`resolve`](../../Binding/classes/Binding.md#resolve)
