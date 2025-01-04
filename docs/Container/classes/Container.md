[**Service Container Documentation v0.0.43**](../../README.md)

***

[Service Container Documentation](../../modules.md) / [Container](../README.md) / Container

# Class: Container

Defined in: [Container.ts:18](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L18)

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

Defined in: [Container.ts:37](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L37)

Create a container.

Initializes the container with empty alias and binding maps.

#### Returns

[`Container`](Container.md)

#### Overrides

[`Proxiable`](../../Proxiable/classes/Proxiable.md).[`constructor`](../../Proxiable/classes/Proxiable.md#constructors)

## Methods

### alias()

> **alias**(`key`, `aliases`): `this`

Defined in: [Container.ts:79](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L79)

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

Defined in: [Container.ts:284](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L284)

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

Defined in: [Container.ts:172](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L172)

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

Defined in: [Container.ts:184](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L184)

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

Defined in: [Container.ts:250](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L250)

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

Defined in: [Container.ts:269](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L269)

Reset the container so that all bindings are removed.

#### Returns

`this`

The container instance.

***

### factory()

> **factory**\<`V`\>(`key`): () => `V`

Defined in: [Container.ts:240](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L240)

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

Defined in: [Container.ts:66](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L66)

Retrieve the value of the aliases property.

#### Returns

`Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

A map of all aliases registered in the container.

***

### getAliasKey()

> **getAliasKey**(`alias`): `undefined` \| [`BindingKey`](../../declarations/type-aliases/BindingKey.md)

Defined in: [Container.ts:107](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L107)

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

Defined in: [Container.ts:57](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L57)

Retrieve the value of the bindings property.

#### Returns

`Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

A map of all bindings registered in the container.

***

### has()

> **has**(`key`): `boolean`

Defined in: [Container.ts:260](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L260)

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

Defined in: [Container.ts:118](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L118)

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

Defined in: [Container.ts:130](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L130)

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

Defined in: [Container.ts:97](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L97)

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

Defined in: [Container.ts:198](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L198)

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

Defined in: [Container.ts:226](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L226)

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

Defined in: [Container.ts:146](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L146)

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

Defined in: [Container.ts:158](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L158)

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

Defined in: [Container.ts:28](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/Container.ts#L28)

Create a Container.

#### Returns

[`Container`](Container.md)

A new Container instance.
