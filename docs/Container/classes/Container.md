[**Service container Documentation v0.0.0**](../../README.md) • **Docs**

***

[Service container Documentation v0.0.0](../../modules.md) / [Container](../README.md) / Container

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

> **new Container**(): [`Container`](Container.md)

Create a container.

Initializes the container with empty alias and binding maps.

#### Returns

[`Container`](Container.md)

#### Overrides

[`Proxiable`](../../Proxiable/classes/Proxiable.md).[`constructor`](../../Proxiable/classes/Proxiable.md#constructors)

#### Defined in

[Container.ts:29](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L29)

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

[Container.ts:71](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L71)

***

### asAlias()

> **asAlias**(`Class`): `this`

Set class name as camelCase alias.

Automatically assigns a camelCase alias to a given class based on its name or metadata.

#### Parameters

• **Class**: `Function`

The class to alias.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:111](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L111)

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

[Container.ts:309](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L309)

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

[Container.ts:179](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L179)

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

[Container.ts:191](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L191)

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

[Container.ts:256](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L256)

***

### clear()

> **clear**(): `this`

Reset the container so that all bindings are removed.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:275](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L275)

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

[Container.ts:246](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L246)

***

### getAliases()

> **getAliases**(): `Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

Retrieve the value of the aliases property.

#### Returns

`Map`\<`string`, [`BindingKey`](../../declarations/type-aliases/BindingKey.md)\>

A map of all aliases registered in the container.

#### Defined in

[Container.ts:58](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L58)

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

[Container.ts:99](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L99)

***

### getBindings()

> **getBindings**(): `Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

Retrieve the value of the bindings property.

#### Returns

`Map`\<[`BindingKey`](../../declarations/type-aliases/BindingKey.md), [`Binding`](../../models/Binding/classes/Binding.md)\<[`BindingValue`](../../declarations/type-aliases/BindingValue.md)\>\>

A map of all bindings registered in the container.

#### Defined in

[Container.ts:49](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L49)

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

[Container.ts:266](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L266)

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

[Container.ts:125](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L125)

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

[Container.ts:137](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L137)

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

[Container.ts:89](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L89)

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

[Container.ts:205](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L205)

***

### register()

> **register**(`classes`): `this`

Register services with zero configuration.

#### Parameters

• **classes**: `Function` \| `Function`[]

Classes representing the services to be registered in the container.

#### Returns

`this`

The container instance.

#### Defined in

[Container.ts:287](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L287)

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

[Container.ts:232](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L232)

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

[Container.ts:153](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L153)

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

[Container.ts:165](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/Container.ts#L165)
