[**Service Container Documentation**](../../README.md)

***

[Service Container Documentation](../../README.md) / [declarations](../README.md) / Resolver

# Type Alias: Resolver()\<V\>

> **Resolver**\<`V`\> = (`container`) => `V`

Defined in: [declarations.ts:18](https://github.com/stonemjs/service-container/blob/cf80d15a9884720f3c9b3cfe1c53c3f6b0c62c38/src/declarations.ts#L18)

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
