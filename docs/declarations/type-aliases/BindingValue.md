[**Service Container Documentation v0.0.43**](../../README.md) • **Docs**

***

[Service Container Documentation v0.0.43](../../modules.md) / [declarations](../README.md) / BindingValue

# Type Alias: BindingValue

> **BindingValue**: `number` \| `boolean` \| `string` \| `Function` \| `object` \| `symbol`

A union type representing the possible values that can be bound in the container.

Binding values can be of various types, including numbers, booleans, strings, functions, objects, or symbols.
Unlike `BindingKey`, `BindingValue` represents the actual data or instance being bound, while `BindingKey` represents the identifier used to access that data.

## Defined in

[declarations.ts:48](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/declarations.ts#L48)
