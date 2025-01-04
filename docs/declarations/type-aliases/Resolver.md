[**Service Container Documentation v0.0.43**](../../README.md)

***

[Service Container Documentation](../../modules.md) / [declarations](../README.md) / Resolver

# Type Alias: Resolver()\<V\>

> **Resolver**\<`V`\>: (`container`) => `V`

Defined in: [declarations.ts:18](https://github.com/stonemjs/service-container/blob/020e91c7b464b5fa785c869702b6bef84b206d51/src/declarations.ts#L18)

A resolver function that takes a container and returns a value of type V.

## Type Parameters

• **V**

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
