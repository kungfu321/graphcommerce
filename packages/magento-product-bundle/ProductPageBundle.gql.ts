// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const ProductPageBundleFragmentDoc: DocumentNode<ProductPageBundleFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductPageBundle' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BundleProduct' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
  ],
}
export type ProductPageBundleFragment = Pick<Types.BundleProduct, 'id'>
