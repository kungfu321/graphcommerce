import { Badge, createStyles, makeStyles, Popover, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import { CartItemFragment } from './CartItem.gql'
import DeliveryLabel from './DeliveryLabel'
import RemoveItemFromCartFab from './RemoveItemFromCartFab'
import UpdateItemQuantity from './UpdateItemQuantity'

type CartItemBaseProps = CartItemFragment & { cartId: string }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplate: `
          "picture itemName itemPrice quantity rowPrice"
          "picture itemOptions discount discount discount"
        `,
      gridTemplateColumns: `${responsiveVal(70, 125)} auto auto min-content 70px`,
      // gridTemplateRows: `1fr 1fr`,
      columnGap: theme.spacings.sm,
      alignItems: 'center',
      ...theme.typography.body1,
      marginBottom: theme.spacings.md,
    },
    picture: {
      gridArea: 'picture',
      width: responsiveVal(70, 125),
      height: responsiveVal(70, 125),
      padding: responsiveVal(5, 10),
      border: `1px solid rgba(0,0,0,0.15)`,
      borderRadius: '50%',
    },
    badge: {
      '& > button': {
        background: theme.palette.primary.contrastText,
        color: theme.palette.tertiary.contrastText,
        transition: 'opacity .15s ease',
        '&:hover, &:active, &:visited': {
          background: theme.palette.primary.contrastText,
          opacity: 0.75,
        },
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      },
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
      width: '100%',
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      objectFit: 'contain',
      display: 'block',
      mixBlendMode: 'multiply',
    },
    itemName: {
      // ...theme.typography.h5,
      ...theme.typography.body1,
      fontWeight: 500,
      gridArea: 'itemName',
    },
    itemDiscount: {
      gridArea: 'discount',
      ...theme.typography.body2,
      color: theme.palette.primary.mutedText,
      textAlign: 'right',
    },
    itemPrice: {
      gridArea: 'itemPrice',
      textAlign: 'right',
      color: theme.palette.primary.mutedText,
    },
    quantity: {
      gridArea: 'quantity',
    },
    rowPrice: {
      gridArea: 'rowPrice',
      textAlign: 'right',
    },
  }),
  { name: 'CartItem' },
)

type CartItemProps = CartItemBaseProps & UseStyles<typeof useStyles>

export default function CartItem2(props: CartItemProps) {
  const { product, cartId, id, prices, quantity } = props
  const { name } = product
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Badge
        color='default'
        badgeContent={
          <RemoveItemFromCartFab
            cartId={cartId}
            cartItemId={Number(id)}
            className={classes.badge}
          />
        }
        component='div'
        className={classes.picture}
        overlap='circle'
      >
        <div className={classes.pictureSpacing}>
          {product?.thumbnail?.url && product.thumbnail.label && (
            <PictureResponsiveNext
              alt={product.thumbnail.label ?? ''}
              width={104}
              height={86}
              src={product.thumbnail.url ?? ''}
              type='image/jpeg'
              className={classes.pictureResponsive}
            />
          )}
        </div>
      </Badge>
      <div className={classes.itemName}>
        {name}
        <DeliveryLabel />
      </div>
      <div className={classes.itemPrice}>
        <Money {...prices?.price} />
      </div>
      <div className={classes.quantity}>
        <UpdateItemQuantity cartId={cartId} cartItemId={Number(id)} quantity={quantity} />
      </div>
      <div className={classes.rowPrice}>
        <Money {...prices?.row_total_including_tax} /> <br />
      </div>
      <div className={classes.itemDiscount}>
        {prices?.discounts?.map((discount) => (
          <div key={discount?.label ?? ''}>
            {discount?.label}
            {' ('}
            <Money
              currency={discount?.amount.currency}
              value={(discount?.amount.value ?? 0) * -1}
            />
            )
          </div>
        ))}
      </div>
    </div>
  )
}
