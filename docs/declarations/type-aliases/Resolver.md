[**Service Container Documentation v0.0.43**](../../README.md) • **Docs**

***

[Service Container Documentation v0.0.43](../../modules.md) / [declarations](../README.md) / Resolver

# Type Alias: Resolver()\<V\>

> **Resolver**\<`V`\>: (`container`) => `V`

A resolver function that takes a container and returns a value of type V.

## Type Parameters

• **V**

The type of value that the resolver returns.

## Parameters

• **container**: [`Container`](../../Container/classes/Container.md)

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

## Defined in

[declarations.ts:18](https://github.com/stonemjs/service-container/blob/f563ebfbcf5ea11d75901c138f530235ce2f4c94/src/declarations.ts#L18)
