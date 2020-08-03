# Using Apollo Client for local state management

We're using Apollo Client 3's local state feature to handle client side only
queries.

This means that we don't:

- Need to store state in localStorage manually
- Need to store state in cookies
- Need to make sure all parts of the application are updated properly.

Learning about state management with Apollo Client:

- https://github.com/apollographql/ac3-state-management-examples
- https://www.apollographql.com/blog/dispatch-this-using-apollo-client-3-as-a-state-management-solution/

## Defining local state

1: Define the GraphQL extension for your application:

```graphql
extend type Query {
  cartId: String
}
```

2: Define a GraphQL query for your application with `@client`

```graphql
query CartId {
  cartId @client
}
```

3: Reading the query

```tsx
function MyComponent() {
  const { data: cartIdData } = useCartIdQuery()
  return <div>{cartIdData?.cartId || 'no cart id'}</div>
}
```

4: Define a TypePolicy to return data on the query

```ts
/**
 * When an empty cart is created, we store the cartId separately
 */
const createEmptyCart: FieldPolicy<
  GQLCreateEmptyCartMutation['createEmptyCart']
> = {
  merge(_existing, cartId, options) {
    // We write the result of the above query
    options.cache.writeQuery<GQLCartIdQuery, GQLCartIdQueryVariables>({
      query: CartIdDocument,
      data: { cartId },
      broadcast: true,
    })
    return cartId
  },
}

const typePolicies: TypePolicies = {
  Mutation: { fields: { createEmptyCart } },
}
```

5: Add the typePolicies to `lib/apolloClient.ts`

```ts
const cache = new InMemoryCache({
  possibleTypes,
  // Add them here
  typePolicies: mergeDeep(cartIdtypePolicies, isLoggedInTypePolicies),
}).restore(initialState)
```

## Maintaining state between sessions

The complete Apollo Client cache is stored in localstorage by using
[apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist).