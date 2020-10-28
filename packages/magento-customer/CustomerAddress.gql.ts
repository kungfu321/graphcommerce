// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const CustomerAddressFragmentDoc: DocumentNode<CustomerAddressFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CustomerAddress' } },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' }, arguments: [], directives: [] },
          { kind: 'Field', name: { kind: 'Name', value: 'prefix' }, arguments: [], directives: [] },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'firstname' },
            arguments: [],
            directives: [],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'middlename' },
            arguments: [],
            directives: [],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lastname' },
            arguments: [],
            directives: [],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'suffix' }, arguments: [], directives: [] },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'company' },
            arguments: [],
            directives: [],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'vat_id' }, arguments: [], directives: [] },
          { kind: 'Field', name: { kind: 'Name', value: 'city' }, arguments: [], directives: [] },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'postcode' },
            arguments: [],
            directives: [],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'region' },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'region' },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'region_code' },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'street' }, arguments: [], directives: [] },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'telephone' },
            arguments: [],
            directives: [],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'default_billing' },
            arguments: [],
            directives: [],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'default_shipping' },
            arguments: [],
            directives: [],
          },
        ],
      },
    },
  ],
}
export type CustomerAddressFragment = Pick<
  Types.CustomerAddress,
  | 'id'
  | 'prefix'
  | 'firstname'
  | 'middlename'
  | 'lastname'
  | 'suffix'
  | 'company'
  | 'vat_id'
  | 'city'
  | 'postcode'
  | 'street'
  | 'telephone'
  | 'default_billing'
  | 'default_shipping'
> & { region?: Types.Maybe<Pick<Types.CustomerAddressRegion, 'region' | 'region_code'>> }