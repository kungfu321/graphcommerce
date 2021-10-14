import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import RowColumnOne from '../Row/RowColumnOne'
import RowColumnThree from '../Row/RowColumnThree'
import RowColumnTwo from '../Row/RowColumnTwo'
import RowContentLinks from '../Row/RowContentLinks'
import RowProduct from '../Row/RowProduct'
import RowQuote from '../Row/RowQuote'
import RowSpecialBanner from '../Row/RowSpecialBanner'
import { ProductpagesContentQueryFragment } from './ProductpagesContentQueryFragment.gql'

type ContentTypeRenderer = TypeRenderer<
  ProductpagesContentQueryFragment['productpages'][0]['content'][0]
>

const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowSpecialBanner,
  RowContentLinks,
  RowQuote,
  RowProduct,
}

export type ProductProps = ProductpagesContentQueryFragment['productpages'][0] & {
  renderer?: Partial<ContentTypeRenderer>
}

export default function ProductpagesContent(props: ProductProps) {
  const { content, renderer } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    <>
      {content.map((item) => (
        <RenderType renderer={mergedRenderer} key={item.id} {...item} />
      ))}
    </>
  )
}
