[**Service Container Documentation v0.0.44**](../../README.md)

***

[Service Container Documentation](../../modules.md) / [declarations](../README.md) / BindingValue

# Type Alias: BindingValue

> **BindingValue**: `number` \| `boolean` \| `string` \| `Function` \| `object` \| `symbol`

Defined in: [declarations.ts:48](https://github.com/stonemjs/service-container/blob/249b060f7936ebb0ea1e26fa167dc5f8fc0b9bc3/src/declarations.ts#L48)

A union type representing the possible values that can be bound in the container.

Binding values can be of various types, including numbers, booleans, strings, functions, objects, or symbols.
Unlike `BindingKey`, `BindingValue` represents the actual data or instance being bound, while `BindingKey` represents the identifier used to access that data.
