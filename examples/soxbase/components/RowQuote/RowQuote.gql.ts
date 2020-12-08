// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '../../generated/types'

export const RowQuoteFragmentDoc: DocumentNode<RowQuoteFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RowQuote' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RowQuote' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quote' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'raw' } }],
            },
          },
        ],
      },
    },
  ],
}
export type RowQuoteFragment = { quote: Pick<Types.RichText, 'raw'> }
