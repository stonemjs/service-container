[**Service Container Documentation**](../../README.md)

***

[Service Container Documentation](../../README.md) / [declarations](../README.md) / Resolver

# Type Alias: Resolver()\<V\>

> **Resolver**\<`V`\> = (`container`) => `V`

Defined in: [declarations.ts:18](https://github.com/stonemjs/service-container/blob/5a701d60c47419b2e55af779088aed1ae998b66e/src/declarations.ts#L18)

A resolver function that takes a container and returns a value of type V.

## Type Parameters

### V

`V`

The type of value that the resolver returns.

## Parameters

### container

[`Container`](../../Container/classes/Container.md)

The container used to resolve dependencies.

## Returns

`V`

The resolved value of type V.

## Example

```typescript
const myResolver: Resolver<number> = (container: Container) => {
  // Use the container to resolve dependencies and return a number.
  return 42;
};
```
