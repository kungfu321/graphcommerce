/* eslint-disable react/no-danger */
import React from 'react'
import Error from 'next/error'
import CategoryMeta from 'components/CategoryMeta'
import CategoryDescription from 'components/CategoryDescription'
import CategoryBreadcrumb from 'components/CategoryBreadcrumb'
import ProductListPagination from 'components/ProductListPagination'
import ProductListSort from 'components/ProductListSort'
import ProductListItems from 'components/ProductListItems'
import ProductListFilters from 'components/ProductListFilters'
import CategoryChildren from 'components/CategoryChildren'
import { GetCategoryPageProps } from './getCategoryPageProps'

export default function CategoryPage({
  categoryList,
  products,
  params,
  storeConfig,
  filterTypeMap,
}: GetCategoryPageProps) {
  if (!categoryList || !categoryList[0]) return <Error statusCode={404}>404</Error>
  return (
    <>
      <CategoryMeta {...categoryList[0]} />
      <CategoryBreadcrumb {...categoryList[0]} />
      <CategoryDescription {...categoryList[0]} />
      <CategoryChildren {...categoryList[0]} />
      <ProductListPagination {...products} params={params} />
      <ProductListSort
        {...products}
        params={params}
        defaultSort={storeConfig.catalog_default_sort_by}
      />
      <ProductListFilters {...products} params={params} filterTypeMap={filterTypeMap} />
      <ProductListItems {...products} />
    </>
  )
}