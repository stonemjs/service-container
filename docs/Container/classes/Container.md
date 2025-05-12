[**Service Container Documentation v0.0.44**](../../README.md)

***

[Service Container Documentation](../../modules.md) / [Container](../README.md) / Container

# Class: Container

Defined in: [Container.ts:18](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L18)

Class representing a Container.

The Container class acts as a dependency injection container, managing bindings and resolving instances.
It supports different types of bindings, such as singletons, factories, and instances, and allows the use of aliases for bindings.
This makes it easier to manage and resolve complex dependency trees in an application.

## Author

Mr. Stone <evensstone@gmail.com>

## Extends

- [`Proxiable`](../../Proxiable/classes/Proxiable.md)

## Constructors

### new Container()

> `protected` **new Container**(): [`Container`](Container.md)

Defined in: [Container.ts:54](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L54)

Create a container.

Initializes the container with empty alias and binding maps.

#### Returns

[`Container`](Container.md)

#### Overrides

[`Proxiable`](../../Proxiable/classes/Proxiable.md).[`constructor`](../../Proxiable/classes/Proxiable.md#constructors)

## Methods

### alias()

> **alias**(`key`, `aliases`): `this`

Defined in: [Container.ts:87](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L87)

Set a binding as alias.

Adds one or more aliases for a given binding key.

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The binding value.

##### aliases

One or more strings representing the aliases.

`string` | `string`[]

#### Returns

`this`

The container instance.

***

### autoBinding()

> **autoBinding**\<`V`\>(`name`, `item`?, `singleton`?, `alias`?): `this`

Defined in: [Container.ts:292](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L292)

AutoBind value to the service container.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### name

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

A key to make the binding. Can be anything.

##### item?

`V`

The item to bind.

##### singleton?

`boolean` = `true`

Bind as singleton when true.

##### alias?

Key binding aliases.

`string` | `string`[]

#### Returns

`this`

The container instance.

***

### binding()

> **binding**\<`V`\>(`key`, `resolver`): `this`

Defined in: [Container.ts:180](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L180)

Bind a resolver function into the container under the provided key, returning a new instance each time.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

##### resolver

[`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

***

### bindingIf()

> **bindingIf**\<`V`\>(`key`, `resolver`): `this`

Defined in: [Container.ts:192](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L192)

Bind a resolver function into the container under the provided key, returning a new instance each time if not already bound.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

##### resolver

[`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

***

### bound()

> **bound**(`key`): `boolean`

Defined in: [Container.ts:258](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L258)

Check if a value is already bound in the container by its key.

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to check.

#### Returns

`boolean`

True if the key is bound, false otherwise.

***

### clear()

> **clear**(): `this`

Defined in: [Container.ts:277](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L277)

Reset the container so that all bindings are removed.

#### Returns

`this`

The container instance.

***

### factory()

> **factory**\<`V`\>(`key`): () => `V`

Defined in: [Container.ts:248](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L248)

Resolve a value from the container by its key and return it in a factory function.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to resolve.

#### Returns

`Function`

A factory function that returns the resolved value.

##### Returns

`V`

***

### getAliases()

> **getAliases**(): `Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

Defined in: [Container.ts:74](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L74)

Retrieve the value of the aliases property.

#### Returns

`Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

A map of all aliases registered in the container.

***

### getAliasKey()

> **getAliasKey**(`alias`): `undefined` \| [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

Defined in: [Container.ts:115](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L115)

Get a binding key by its alias.

#### Parameters

##### alias

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The alias name.

#### Returns

`undefined` \| [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The binding key associated with the alias, or undefined if not found.

***

### getBindings()

> **getBindings**(): `Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

Defined in: [Container.ts:65](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L65)

Retrieve the value of the bindings property.

#### Returns

`Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

A map of all bindings registered in the container.

***

### has()

> **has**(`key`): `boolean`

Defined in: [Container.ts:268](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L268)

Check if a value is already bound in the container by its key.

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to check.

#### Returns

`boolean`

True if the key is bound, false otherwise.

***

### instance()

> **instance**(`key`, `value`): `this`

Defined in: [Container.ts:126](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L126)

Bind a single instance or value into the container under the provided key.

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

##### value

[`BindingValue`](../../declarations/type-aliases/BindingValue.md)

The value to be bound.

#### Returns

`this`

The container instance.

***

### instanceIf()

> **instanceIf**(`key`, `value`): `this`

Defined in: [Container.ts:138](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L138)

Bind a single instance or value into the container under the provided key if not already bound.

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

##### value

[`BindingValue`](../../declarations/type-aliases/BindingValue.md)

The value to be bound.

#### Returns

`this`

The container instance.

***

### isAlias()

> **isAlias**(`alias`): `boolean`

Defined in: [Container.ts:105](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L105)

Check if an alias exists in the container.

#### Parameters

##### alias

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The alias to check.

#### Returns

`boolean`

True if the alias exists, false otherwise.

***

### make()

> **make**\<`V`\>(`key`): `V`

Defined in: [Container.ts:206](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L206)

Resolve a registered value from the container by its key.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to resolve.

#### Returns

`V`

The resolved value.

#### Throws

ContainerError if the key cannot be resolved.

***

### resolve()

> **resolve**\<`V`\>(`key`, `singleton`): `V`

Defined in: [Container.ts:234](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L234)

Resolve a value from the container by its key, binding it if necessary.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to resolve.

##### singleton

`boolean` = `false`

Whether to bind as a singleton if not already bound.

#### Returns

`V`

The resolved value.

***

### singleton()

> **singleton**\<`V`\>(`key`, `resolver`): `this`

Defined in: [Container.ts:154](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L154)

Bind a resolver function into the container under the provided key as a singleton.

The resolver function will be called once, and the resulting value will be cached for future use.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the singleton value.

##### resolver

[`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

***

### singletonIf()

> **singletonIf**\<`V`\>(`key`, `resolver`): `this`

Defined in: [Container.ts:166](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L166)

Bind a resolver function into the container under the provided key as a singleton if not already bound.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

##### key

[`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the singleton value.

##### resolver

[`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

***

### create()

> `static` **create**(): [`Container`](Container.md)

Defined in: [Container.ts:28](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/Container.ts#L28)

Create a Container.

#### Returns

[`Container`](Container.md)

A new Container instance.
