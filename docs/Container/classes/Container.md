[**Service Container Documentation v0.0.41**](../../README.md) • **Docs**

***

[Service Container Documentation v0.0.41](../../modules.md) / [Container](../README.md) / Container

# Class: Container

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

Create a container.

Initializes the container with empty alias and binding maps.

#### Returns

[`Container`](Container.md)

#### Overrides

[`Proxiable`](../../Proxiable/classes/Proxiable.md).[`constructor`](../../Proxiable/classes/Proxiable.md#constructors)

#### Defined in

[Container.ts:37](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L37)

## Methods

### alias()

> **alias**(`key`, `aliases`): `this`

Set a binding as alias.

Adds one or more aliases for a given binding key.

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The binding value.

• **aliases**: `string` \| `string`[]

One or more strings representing the aliases.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:79](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L79)

***

### autoBinding()

> **autoBinding**\<`V`\>(`name`, `item`?, `singleton`?, `alias`?): `this`

AutoBind value to the service container.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **name**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

A key to make the binding. Can be anything.

• **item?**: `V`

The item to bind.

• **singleton?**: `boolean` = `true`

Bind as singleton when true.

• **alias?**: `string` \| `string`[] = `[]`

Key binding aliases.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:283](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L283)

***

### binding()

> **binding**\<`V`\>(`key`, `resolver`): `this`

Bind a resolver function into the container under the provided key, returning a new instance each time.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

• **resolver**: [`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:172](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L172)

***

### bindingIf()

> **bindingIf**\<`V`\>(`key`, `resolver`): `this`

Bind a resolver function into the container under the provided key, returning a new instance each time if not already bound.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

• **resolver**: [`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:184](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L184)

***

### bound()

> **bound**(`key`): `boolean`

Check if a value is already bound in the container by its key.

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to check.

#### Returns

`boolean`

True if the key is bound, false otherwise.

#### Defined in

[Container.ts:249](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L249)

***

### clear()

> **clear**(): `this`

Reset the container so that all bindings are removed.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:268](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L268)

***

### factory()

> **factory**\<`V`\>(`key`): () => `undefined` \| `V`

Resolve a value from the container by its key and return it in a factory function.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to resolve.

#### Returns

`Function`

A factory function that returns the resolved value.

##### Returns

`undefined` \| `V`

#### Defined in

[Container.ts:239](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L239)

***

### getAliases()

> **getAliases**(): `Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

Retrieve the value of the aliases property.

#### Returns

`Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

A map of all aliases registered in the container.

#### Defined in

[Container.ts:66](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L66)

***

### getAliasKey()

> **getAliasKey**(`alias`): `undefined` \| [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

Get a binding key by its alias.

#### Parameters

• **alias**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The alias name.

#### Returns

`undefined` \| [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The binding key associated with the alias, or undefined if not found.

#### Defined in

[Container.ts:107](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L107)

***

### getBindings()

> **getBindings**(): `Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

Retrieve the value of the bindings property.

#### Returns

`Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

A map of all bindings registered in the container.

#### Defined in

[Container.ts:57](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L57)

***

### has()

> **has**(`key`): `boolean`

Check if a value is already bound in the container by its key.

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to check.

#### Returns

`boolean`

True if the key is bound, false otherwise.

#### Defined in

[Container.ts:259](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L259)

***

### instance()

> **instance**(`key`, `value`): `this`

Bind a single instance or value into the container under the provided key.

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

• **value**: [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

The value to be bound.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:118](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L118)

***

### instanceIf()

> **instanceIf**(`key`, `value`): `this`

Bind a single instance or value into the container under the provided key if not already bound.

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the value.

• **value**: [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

The value to be bound.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:130](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L130)

***

### isAlias()

> **isAlias**(`alias`): `boolean`

Check if an alias exists in the container.

#### Parameters

• **alias**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The alias to check.

#### Returns

`boolean`

True if the alias exists, false otherwise.

#### Defined in

[Container.ts:97](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L97)

***

### make()

> **make**\<`V`\>(`key`): `undefined` \| `V`

Resolve a registered value from the container by its key.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to resolve.

#### Returns

`undefined` \| `V`

The resolved value.

#### Throws

ContainerError if the key cannot be resolved.

#### Defined in

[Container.ts:198](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L198)

***

### resolve()

> **resolve**\<`V`\>(`key`, `singleton`): `undefined` \| `V`

Resolve a value from the container by its key, binding it if necessary.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to resolve.

• **singleton**: `boolean` = `false`

Whether to bind as a singleton if not already bound.

#### Returns

`undefined` \| `V`

The resolved value.

#### Defined in

[Container.ts:225](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L225)

***

### singleton()

> **singleton**\<`V`\>(`key`, `resolver`): `this`

Bind a resolver function into the container under the provided key as a singleton.

The resolver function will be called once, and the resulting value will be cached for future use.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the singleton value.

• **resolver**: [`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:146](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L146)

***

### singletonIf()

> **singletonIf**\<`V`\>(`key`, `resolver`): `this`

Bind a resolver function into the container under the provided key as a singleton if not already bound.

#### Type Parameters

• **V** *extends* [`BindingValue`](../../declarations/type-aliases/BindingValue.md)

#### Parameters

• **key**: [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

The key to associate with the singleton value.

• **resolver**: [`Resolver`](../../declarations/type-aliases/Resolver.md)\<`V`\>

The resolver function to provide the value.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:158](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L158)

***

### create()

> `static` **create**(): [`Container`](Container.md)

Create a Container.

#### Returns

[`Container`](Container.md)

A new Container instance.

#### Defined in

[Container.ts:28](https://github.com/stonemjs/service-container/blob/0ff9b9142bca163f80869df46a66780942ea289c/src/Container.ts#L28)
