import { useQuery, TypedDocumentNode, QueryHookOptions } from '@graphcommerce/graphql'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCurrentCartId } from './useCurrentCartId'

/**
 * Requires the query to have a `$cartId: String!` argument. It will automatically inject the
 * currently active cart_id.
 *
 * Example:
 *
 * ```tsx
 * const { data } = useCartQuery(CartFabQueryDocument)
 * ```
 */
export function useCartQuery<Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, Omit<V, 'cartId'>> & { allowUrl?: boolean } = {},
) {
  const { allowUrl = true, ...queryOptions } = options
  const [skip, setSkip] = useState(true)
  const router = useRouter()
  const currentCartId = useCurrentCartId({ skip })
  const urlCartId = router.query.cart_id
  const usingUrl = allowUrl && typeof urlCartId === 'string'
  const cartId = usingUrl ? urlCartId : currentCartId

  useEffect(() => {
    if (skip) setSkip(false)
  }, [skip])

  if (usingUrl && typeof queryOptions.fetchPolicy === 'undefined')
    queryOptions.fetchPolicy = 'cache-only'

  if (usingUrl && typeof queryOptions.returnPartialData === 'undefined')
    queryOptions.returnPartialData = true

  queryOptions.variables = { cartId, ...options?.variables } as V
  queryOptions.skip = queryOptions?.skip || !cartId
  queryOptions.ssr = false

  return useQuery(document, queryOptions)
}
