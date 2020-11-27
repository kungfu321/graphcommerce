// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const CartItemConfigurableFragmentDoc: DocumentNode<
  CartItemConfigurableFragment,
  unknown
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CartItemConfigurable' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ConfigurableCartItem' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'configurable_options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'option_label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value_label' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type CartItemConfigurableFragment = {
  configurable_options: Array<
    Types.Maybe<
      Pick<Types.SelectedConfigurableOption, 'id' | 'option_label' | 'value_id' | 'value_label'>
    >
  >
}
