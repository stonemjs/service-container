[**Service container Documentation v0.0.0**](../../README.md) • **Docs**

***

[Service container Documentation v0.0.0](../../modules.md) / [declarations](../README.md) / BindingValue

# Type Alias: BindingValue

> **BindingValue**: `number` \| `boolean` \| `string` \| `Function` \| `object` \| `symbol`

A union type representing the possible values that can be bound in the container.

Binding values can be of various types, including numbers, booleans, strings, functions, objects, or symbols.
Unlike `BindingKey`, `BindingValue` represents the actual data or instance being bound, while `BindingKey` represents the identifier used to access that data.

## Defined in

[declarations.ts:48](https://github.com/stonemjs/service-container/blob/facb7eba71781c35c6df9764b1f17d5385f9ab10/src/declarations.ts#L48)
