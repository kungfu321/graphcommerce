// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import {
  CustomizableAreaOptionFragment,
  CustomizableAreaOptionFragmentDoc,
} from './CustomizableAreaOption.gql'
import {
  CustomizableDateOptionFragment,
  CustomizableDateOptionFragmentDoc,
} from './CustomizableDateOption.gql'
import {
  CustomizableDropDownOptionFragment,
  CustomizableDropDownOptionFragmentDoc,
} from './CustomizableDropDownOption.gql'
import {
  CustomizableFieldOptionFragment,
  CustomizableFieldOptionFragmentDoc,
} from './CustomizableFieldOption.gql'
import {
  CustomizableFileOptionFragment,
  CustomizableFileOptionFragmentDoc,
} from './CustomizableFileOption.gql'
import {
  CustomizableMultipleOptionFragment,
  CustomizableMultipleOptionFragmentDoc,
} from './CustomizableMultipleOption.gql'
import {
  CustomizableRadioOptionFragment,
  CustomizableRadioOptionFragmentDoc,
} from './CustomizableRadioOption.gql'

export const ProductCustomizableFragmentDoc: DocumentNode<ProductCustomizableFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCustomizable' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomizableProductInterface' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomizableAreaOption' } },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomizableDateOption' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomizableDropDownOption' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomizableMultipleOption' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomizableFieldOption' },
                },
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomizableFileOption' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomizableRadioOption' },
                },
              ],
            },
          },
        ],
      },
    },
    ...CustomizableAreaOptionFragmentDoc.definitions,
    ...CustomizableDateOptionFragmentDoc.definitions,
    ...CustomizableDropDownOptionFragmentDoc.definitions,
    ...CustomizableMultipleOptionFragmentDoc.definitions,
    ...CustomizableFieldOptionFragmentDoc.definitions,
    ...CustomizableFileOptionFragmentDoc.definitions,
    ...CustomizableRadioOptionFragmentDoc.definitions,
  ],
}
export type ProductCustomizable_VirtualProduct_Fragment = {
  options?: Types.Maybe<
    Array<
      Types.Maybe<
        | ({ __typename: 'CustomizableAreaOption' } & CustomizableAreaOptionFragment)
        | ({ __typename: 'CustomizableDateOption' } & CustomizableDateOptionFragment)
        | ({ __typename: 'CustomizableDropDownOption' } & CustomizableDropDownOptionFragment)
        | ({ __typename: 'CustomizableMultipleOption' } & CustomizableMultipleOptionFragment)
        | ({ __typename: 'CustomizableFieldOption' } & CustomizableFieldOptionFragment)
        | ({ __typename: 'CustomizableFileOption' } & CustomizableFileOptionFragment)
        | ({ __typename: 'CustomizableRadioOption' } & CustomizableRadioOptionFragment)
        | { __typename: 'CustomizableCheckboxOption' }
      >
    >
  >
}

export type ProductCustomizable_SimpleProduct_Fragment = {
  options?: Types.Maybe<
    Array<
      Types.Maybe<
        | ({ __typename: 'CustomizableAreaOption' } & CustomizableAreaOptionFragment)
        | ({ __typename: 'CustomizableDateOption' } & CustomizableDateOptionFragment)
        | ({ __typename: 'CustomizableDropDownOption' } & CustomizableDropDownOptionFragment)
        | ({ __typename: 'CustomizableMultipleOption' } & CustomizableMultipleOptionFragment)
        | ({ __typename: 'CustomizableFieldOption' } & CustomizableFieldOptionFragment)
        | ({ __typename: 'CustomizableFileOption' } & CustomizableFileOptionFragment)
        | ({ __typename: 'CustomizableRadioOption' } & CustomizableRadioOptionFragment)
        | { __typename: 'CustomizableCheckboxOption' }
      >
    >
  >
}

export type ProductCustomizable_DownloadableProduct_Fragment = {
  options?: Types.Maybe<
    Array<
      Types.Maybe<
        | ({ __typename: 'CustomizableAreaOption' } & CustomizableAreaOptionFragment)
        | ({ __typename: 'CustomizableDateOption' } & CustomizableDateOptionFragment)
        | ({ __typename: 'CustomizableDropDownOption' } & CustomizableDropDownOptionFragment)
        | ({ __typename: 'CustomizableMultipleOption' } & CustomizableMultipleOptionFragment)
        | ({ __typename: 'CustomizableFieldOption' } & CustomizableFieldOptionFragment)
        | ({ __typename: 'CustomizableFileOption' } & CustomizableFileOptionFragment)
        | ({ __typename: 'CustomizableRadioOption' } & CustomizableRadioOptionFragment)
        | { __typename: 'CustomizableCheckboxOption' }
      >
    >
  >
}

export type ProductCustomizable_BundleProduct_Fragment = {
  options?: Types.Maybe<
    Array<
      Types.Maybe<
        | ({ __typename: 'CustomizableAreaOption' } & CustomizableAreaOptionFragment)
        | ({ __typename: 'CustomizableDateOption' } & CustomizableDateOptionFragment)
        | ({ __typename: 'CustomizableDropDownOption' } & CustomizableDropDownOptionFragment)
        | ({ __typename: 'CustomizableMultipleOption' } & CustomizableMultipleOptionFragment)
        | ({ __typename: 'CustomizableFieldOption' } & CustomizableFieldOptionFragment)
        | ({ __typename: 'CustomizableFileOption' } & CustomizableFileOptionFragment)
        | ({ __typename: 'CustomizableRadioOption' } & CustomizableRadioOptionFragment)
        | { __typename: 'CustomizableCheckboxOption' }
      >
    >
  >
}

export type ProductCustomizable_ConfigurableProduct_Fragment = {
  options?: Types.Maybe<
    Array<
      Types.Maybe<
        | ({ __typename: 'CustomizableAreaOption' } & CustomizableAreaOptionFragment)
        | ({ __typename: 'CustomizableDateOption' } & CustomizableDateOptionFragment)
        | ({ __typename: 'CustomizableDropDownOption' } & CustomizableDropDownOptionFragment)
        | ({ __typename: 'CustomizableMultipleOption' } & CustomizableMultipleOptionFragment)
        | ({ __typename: 'CustomizableFieldOption' } & CustomizableFieldOptionFragment)
        | ({ __typename: 'CustomizableFileOption' } & CustomizableFileOptionFragment)
        | ({ __typename: 'CustomizableRadioOption' } & CustomizableRadioOptionFragment)
        | { __typename: 'CustomizableCheckboxOption' }
      >
    >
  >
}

export type ProductCustomizableFragment =
  | ProductCustomizable_VirtualProduct_Fragment
  | ProductCustomizable_SimpleProduct_Fragment
  | ProductCustomizable_DownloadableProduct_Fragment
  | ProductCustomizable_BundleProduct_Fragment
  | ProductCustomizable_ConfigurableProduct_Fragment