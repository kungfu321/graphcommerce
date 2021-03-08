import { makeStyles, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import { OrderCardItemImageFragment } from '../OrderCardItemImage/OrderCardItemImage.gql'
import { OrderItemFragment } from './OrderItem.gql'

type OrderItemProps = OrderItemFragment & OrderCardItemImageFragment

const rowImageSize = responsiveVal(70, 125)
const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplate: `
          "picture itemName itemName itemName itemName"
          "picture itemOptions itemOptions itemOptions itemOptions"
          "picture itemPrice itemPrice quantity rowPrice"
        `,
      gridTemplateColumns: `repeat(1, ${rowImageSize})`,
      columnGap: theme.spacings.sm,
      alignItems: 'center',
      ...theme.typography.body1,
      marginBottom: theme.spacings.lg,
      marginTop: theme.spacings.md,
      [theme.breakpoints.up('sm')]: {
        gridTemplate: `
        "picture itemName itemName itemName itemName"
        "picture itemOptions itemPrice quantity rowPrice"
      `,
        gridTemplateColumns: `repeat(1, ${rowImageSize})`,
        marginBottom: theme.spacings.md,
      },
    },
    picture: {
      gridArea: 'picture',
      width: rowImageSize,
      height: rowImageSize,
      padding: responsiveVal(5, 10),
      border: `1px solid rgba(0,0,0,0.15)`,
      borderRadius: '50%',
    },
    pictureSpacing: {
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      flexShrink: 0,
      userSelect: 'none',
      borderRadius: '50%',
      justifyContent: 'center',
      backgroundColor: 'rgb(248,248,248)',
    },
    pictureResponsive: {
      gridColumn: 1,
      backgroundColor: theme.palette.background.paper,
      objectFit: 'cover',
      display: 'block',
      transform: 'scale(1.1)',
    },
    productLink: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
    itemName: {
      ...theme.typography.h5,
      fontWeight: 500,
      gridArea: 'itemName',
      alignSelf: 'flex-end',
      color: theme.palette.text.primary,
      textDecoration: 'none',
      flexWrap: 'nowrap',
    },
    itemPrice: {
      gridArea: 'itemPrice',
      textAlign: 'left',
      alignSelf: 'baseline',
      color: theme.palette.primary.mutedText,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      },
    },
    quantity: {
      gridArea: 'quantity',
      alignSelf: 'baseline',
      textAlign: 'right',
    },
    rowPrice: {
      gridArea: 'rowPrice',
      alignSelf: 'baseline',
      textAlign: 'right',
    },
    optionsList: {
      gridArea: 'itemOptions',
      alignSelf: 'end',
      cursor: 'default',
      [theme.breakpoints.up('sm')]: {
        alignSelf: 'baseline',
      },
    },
    option: {
      color: theme.palette.grey['500'],
      marginRight: theme.spacings.xs,
      paddingBottom: 1,
      display: 'inline',
    },
  }),
  { name: 'OrderItem' },
)

export default function OrderItem(props: OrderItemProps) {
  const {
    product_url_key,
    selected_options,
    product_sale_price,
    quantity_ordered,
    product_name,
    thumbnail,
  } = props
  const classes = useStyles()
  const productLink = `/product/${product_url_key}`

  return (
    <div className={classes.root}>
      <div className={classes.picture}>
        <PageLink href={productLink}>
          <a className={classes.productLink}>
            <div className={classes.pictureSpacing}>
              {thumbnail?.url && thumbnail?.label && (
                <PictureResponsiveNext
                  alt={thumbnail?.label ?? ''}
                  width={104}
                  height={86}
                  src={thumbnail?.url ?? ''}
                  type='image/jpeg'
                  className={classes.pictureResponsive}
                />
              )}
            </div>
          </a>
        </PageLink>
      </div>

      <PageLink href={productLink}>
        <a className={classes.itemName}>{product_name}</a>
      </PageLink>

      <div className={classes.itemPrice}>
        <Money {...product_sale_price} />
      </div>

      <div className={classes.quantity}>{`${quantity_ordered}x`}</div>

      <div className={classes.rowPrice}>
        <Money
          currency={product_sale_price.currency}
          value={(product_sale_price.value ?? 0) * (quantity_ordered ?? 1)}
        />
      </div>

      <div className={classes.optionsList}>
        {selected_options &&
          selected_options.map((option) => (
            <div key={option?.label} className={classes.option}>
              {option?.value}
            </div>
          ))}
      </div>
    </div>
  )
}