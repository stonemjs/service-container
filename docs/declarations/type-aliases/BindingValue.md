[**Service Container Documentation**](../../README.md)

***

[Service Container Documentation](../../README.md) / [declarations](../README.md) / BindingValue

# Type Alias: BindingValue

> **BindingValue** = `number` \| `boolean` \| `string` \| `Function` \| `object` \| `symbol`

Defined in: [declarations.ts:48](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/declarations.ts#L48)

A union type representing the possible values that can be bound in the container.

Binding values can be of various types, including numbers, booleans, strings, functions, objects, or symbols.
Unlike `BindingKey`, `BindingValue` represents the actual data or instance being bound, while `BindingKey` represents the identifier used to access that data.
