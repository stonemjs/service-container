[**Service Container Documentation**](../../../README.md)

***

[Service Container Documentation](../../../README.md) / [models/Singleton](../README.md) / Singleton

# Class: Singleton\<V\>

Defined in: [models/Singleton.ts:15](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/models/Singleton.ts#L15)

Class representing a Singleton.

The Singleton class extends the ResolverBinding class, ensuring that the value is only resolved once.
Subsequent calls to the `resolve` method will return the previously resolved value, making it behave as a singleton.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- [`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md)\<`V`\>

## Type Parameters

### V

`V` *extends* [`BindingValue`](../../../declarations/type-aliases/BindingValue.md)

The type of value that this binding holds.

## Constructors

### Constructor

> **new Singleton**\<`V`\>(`resolver`): `Singleton`\<`V`\>

Defined in: [models/ResolverBinding.ts:28](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/models/ResolverBinding.ts#L28)

Create a new instance of ResolverBinding.

#### Parameters

##### resolver

[`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the binding value.

#### Returns

`Singleton`\<`V`\>

#### Throws

ContainerError if the resolver is not a function.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`constructor`](../../ResolverBinding/classes/ResolverBinding.md#constructor)

## Properties

### resolver

> `protected` `readonly` **resolver**: [`Resolver`](../../../declarations/type-aliases/Resolver.md)\<`V`\>

Defined in: [models/ResolverBinding.ts:20](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/models/ResolverBinding.ts#L20)

The resolver function used to provide the binding value.

This function will be called when the value is needed, allowing for lazy instantiation
and dependency resolution. It should return an instance of type `V`.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`resolver`](../../ResolverBinding/classes/ResolverBinding.md#resolver)

***

### value?

> `protected` `optional` **value**: `V`

Defined in: [models/Binding.ts:20](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/models/Binding.ts#L20)

The value held by the binding.

This value is resolved at runtime, either directly or through a resolver function.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`value`](../../ResolverBinding/classes/ResolverBinding.md#value)

## Methods

### isResolved()

> `protected` **isResolved**(): `boolean`

Defined in: [models/Binding.ts:36](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/models/Binding.ts#L36)

Check if the value has been resolved.

#### Returns

`boolean`

A boolean indicating whether the value has been resolved.

#### Inherited from

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`isResolved`](../../ResolverBinding/classes/ResolverBinding.md#isresolved)

***

### resolve()

> **resolve**(`container`): `undefined` \| `V`

Defined in: [models/Singleton.ts:26](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/models/Singleton.ts#L26)

Resolve and return the value of the binding.

If the value has already been resolved, return the cached value. Otherwise, use the resolver function
to resolve the value, store it, and return it.

#### Parameters

##### container

[`Container`](../../../Container/classes/Container.md)

The container to resolve dependencies from.

#### Returns

`undefined` \| `V`

The resolved value of the binding.

#### Throws

ContainerError if the value cannot be resolved.

#### Overrides

[`ResolverBinding`](../../ResolverBinding/classes/ResolverBinding.md).[`resolve`](../../ResolverBinding/classes/ResolverBinding.md#resolve)
