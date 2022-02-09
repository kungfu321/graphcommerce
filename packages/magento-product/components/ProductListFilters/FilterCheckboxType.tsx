import { cloneDeep } from '@graphcommerce/graphql'
import { iconCancelAlt, SvgIcon } from '@graphcommerce/next-ui'
import { Chip, ChipProps, SxProps } from '@mui/material'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import ProductListLink from '../ProductListLink/ProductListLink'
import { FilterIn } from './FilterEqualType'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type FilterCheckboxTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipProps, 'selected'> & { sx?: SxProps<Theme> }

export default function FilterCheckboxType(props: FilterCheckboxTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code]
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  if (!options?.[0]) return null

  const option = options?.[1]?.value === '1' ? options[1] : options[0]
  const isActive = currentFilter?.in?.includes(option.value)

  const filter = isActive ? {} : ({ in: [option.value] } as FilterIn)

  return (
    <ProductListLink
      {...params}
      filters={{ ...params.filters, [attribute_code]: filter }}
      currentPage={undefined}
      noLink
      link={{ scroll: false, replace: true }}
    >
      <Chip
        color={isActive ? undefined : 'default'}
        onDelete={
          isActive
            ? () => {
                const linkParams = cloneDeep(params)

                delete linkParams.currentPage
                delete linkParams.filters[attribute_code]

                replaceRoute(linkParams)
              }
            : undefined
        }
        deleteIcon={isActive ? <SvgIcon src={iconCancelAlt} size='small' /> : undefined}
        label={label}
        clickable
        {...chipProps}
      />
    </ProductListLink>
  )
}
