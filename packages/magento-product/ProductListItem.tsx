import { Typography, makeStyles, Theme, Link as MuiLink } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { useProductLink } from './ProductLink'
import { ProductListItemFragment } from './ProductListItem.gql'
import ProductListPrice from './ProductListPrice'

export const useProductListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      position: 'relative',
      ...theme.typography.body1,
      height: '100%',
    },
    title: {
      display: 'inline-block',
      ...theme.typography.h6,
      color: theme.palette.primary.contrastText,
    },
    subTitle: {
      display: 'inline-block',
      textTransform: 'uppercase',
      fontSize: 13,
      fontWeight: 400,
      marginLeft: 8,
    },
    itemTitleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14,
      '& > div': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    imageContainerOverlayGrid: {
      display: 'grid',
      gridTemplateAreas: `
          "topLeft topRight"
          "bottomLeft bottomRight"
      `,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
      padding: responsiveVal(8, 12),
      color: theme.palette.primary.contrastText,
    },
    cellAlignRight: {
      justifySelf: 'end',
    },
    cellAlignBottom: {
      alignSelf: 'flex-end',
    },
    overlayItem: {
      '& div': {
        margin: 5,
        maxWidth: 20,
        fontSize: 14,
      },
    },
    imageContainer: ({ aspectRatio = [4, 3] }: BaseProps) => ({
      display: 'block',
      position: 'relative',
      paddingTop: `calc(100% / ${aspectRatio[0]} * ${aspectRatio[1]})`,
      background: 'rgba(0, 0, 0, 0.04)', // thema specifiek
    }),
    placeholder: {
      display: 'flex',
      textAlign: 'center',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.typography.body2,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      fontWeight: 600,
      userSelect: 'none',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      position: 'absolute',
      top: 0,
      left: 0,
      mixBlendMode: 'multiply', // thema specifiek
    },
    link: {
      textDecoration: 'underline',
    },
    discount: {
      background: '#000',
      padding: '4px 6px',
      color: '#fff',
      display: 'inline',
      ...theme.typography.h6,
    },
  }),
  { name: 'ProductListItemSimple' },
)

export type SwatchLocationKeys = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'

export type SwatchLocations = Partial<Record<SwatchLocationKeys, React.ReactNode>>

type BaseProps = PropsWithChildren<
  { subTitle?: React.ReactNode; aspectRatio?: [number, number] } & SwatchLocations &
    ProductListItemFragment
>

export type ProductListItemProps = BaseProps & UseStyles<typeof useProductListItemStyles>

export default function ProductListItem(props: ProductListItemProps) {
  const {
    subTitle,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    small_image,
    name,
    price_range,
    children,
  } = props
  const classes = useProductListItemStyles(props)
  const productLink = useProductLink(props)
  const discount = Math.floor(price_range.minimum_price.discount?.percent_off ?? 0)

  return (
    <div className={classes.item}>
      <PageLink href={productLink}>
        <MuiLink underline='none'>
          <div className={classes.imageContainer}>
            {small_image ? (
              <PictureResponsiveNext
                alt={small_image.label ?? ''}
                width={320}
                height={320}
                src={small_image.url ?? ''}
                type='image/jpeg'
                className={classes.image}
              />
            ) : (
              <div className={clsx(classes.placeholder, classes.image)}>GEEN AFBEELDING</div>
            )}

            <div className={classes.imageContainerOverlayGrid}>
              <div className={classes.overlayItem}>
                {discount > 0 && <div className={classes.discount}>{`- ${discount}%`}</div>}
                {topLeft}
              </div>
              <div className={clsx(classes.overlayItem, classes.cellAlignRight)}>{topRight}</div>
              <div className={clsx(classes.overlayItem, classes.cellAlignBottom)}>{bottomLeft}</div>
              <div
                className={clsx(
                  classes.overlayItem,
                  classes.cellAlignBottom,
                  classes.cellAlignRight,
                )}
              >
                {bottomRight}
              </div>
            </div>
          </div>
        </MuiLink>
      </PageLink>

      <div className={classes.itemTitleContainer}>
        <div>
          <Typography component='h2' className={classes.title}>
            {name}
          </Typography>
          {subTitle}
        </div>
        <ProductListPrice {...price_range.minimum_price} />
      </div>

      {children}
    </div>
  )
}
