[**Service Container Documentation v0.0.41**](../../README.md) • **Docs**

***

[Service Container Documentation v0.0.41](../../modules.md) / [declarations](../README.md) / BindingValue

# Type Alias: BindingValue

> **BindingValue**: `number` \| `boolean` \| `string` \| `Function` \| `object` \| `symbol`

A union type representing the possible values that can be bound in the container.

Binding values can be of various types, including numbers, booleans, strings, functions, objects, or symbols.
Unlike `BindingKey`, `BindingValue` represents the actual data or instance being bound, while `BindingKey` represents the identifier used to access that data.

## Defined in

[declarations.ts:48](https://github.com/stonemjs/service-container/blob/7783da28757f6e31cf32b1e1a6dcef833c613a29/src/declarations.ts#L48)
