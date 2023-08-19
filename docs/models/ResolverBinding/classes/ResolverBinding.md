[**Service container Documentation v0.0.0**](../../../README.md) • **Docs**

***

[Service container Documentation v0.0.0](../../../modules.md) / [models/ResolverBinding](../README.md) / ResolverBinding

# Class: `abstract` ResolverBinding\<V\>

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

Create a new instance of ResolverBinding.

#### Parameters

• **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the binding value.

#### Returns

[`ResolverBinding`](ResolverBinding.md)\<`V`\>

#### Throws

ContainerError if the resolver is not a function.

#### Overrides

[`Binding`](../../Binding/classes/Binding.md).[`constructor`](../../Binding/classes/Binding.md#constructors)

#### Defined in

[models/ResolverBinding.ts:28](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/ResolverBinding.ts#L28)

## Properties

### resolver

> `protected` `readonly` **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function used to provide the binding value.

This function will be called when the value is needed, allowing for lazy instantiation
and dependency resolution. It should return an instance of type `V`.

#### Defined in

[models/ResolverBinding.ts:20](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/ResolverBinding.ts#L20)

***

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

> `abstract` **resolve**(`container`): `undefined` \| `V`

Resolve and return the value of the binding.

This abstract method must be implemented by subclasses to provide specific resolution logic.

#### Parameters

• **container**: [`Container`](../../../Container/classes/Container.md)

The container to resolve dependencies from.

#### Returns

`undefined` \| `V`

The resolved value of the binding.

#### Inherited from

[`Binding`](../../Binding/classes/Binding.md).[`resolve`](../../Binding/classes/Binding.md#resolve)

#### Defined in

[models/Binding.ts:48](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/models/Binding.ts#L48)
