[**Service Container Documentation**](../../README.md)

***

[Service Container Documentation](../../README.md) / [declarations](../README.md) / BindingValue

# Type Alias: BindingValue

> **BindingValue** = `number` \| `boolean` \| `string` \| `Function` \| `object` \| `symbol`

Defined in: [declarations.ts:48](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/declarations.ts#L48)

A union type representing the possible values that can be bound in the container.

Binding values can be of various types, including numbers, booleans, strings, functions, objects, or symbols.
Unlike `BindingKey`, `BindingValue` represents the actual data or instance being bound, while `BindingKey` represents the identifier used to access that data.
