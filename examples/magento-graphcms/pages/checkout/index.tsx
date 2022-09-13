import {
  ComposedSubmitButton,
  ComposedSubmitLinkOrButton,
  ComposedForm,
  ComposedSubmit,
  WaitForQueries,
} from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import {
  ApolloCartErrorAlert,
  ApolloCartErrorFullPage,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { EmailForm } from '@graphcommerce/magento-cart-email'
import { PickupLocationSelector } from '@graphcommerce/magento-cart-pickup'
import {
  ShippingAddressForm,
  CustomerAddressForm,
} from '@graphcommerce/magento-cart-shipping-address'
import { ShippingMethodForm } from '@graphcommerce/magento-cart-shipping-method'
import { CustomerDocument, useCustomerQuery } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FormActions,
  GetStaticProps,
  iconBox,
  LayoutHeader,
  Stepper,
  LayoutTitle,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function ShippingPage() {
  useGoogleRecaptcha()
  const router = useRouter()
  const shippingPage = useCartQuery(ShippingPageDocument, { fetchPolicy: 'cache-and-network' })
  const customerAddresses = useCustomerQuery(CustomerDocument, { fetchPolicy: 'cache-and-network' })

  const cartExists =
    typeof shippingPage.data?.cart !== 'undefined' &&
    (shippingPage.data.cart?.items?.length ?? 0) > 0

  let clickHandler
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    clickHandler = (e) => {
      gtag('event', 'begin_checkout', {
        currency: shippingPage.data?.cart?.prices?.grand_total?.currency,
        value: shippingPage.data?.cart?.prices?.grand_total?.value,
        coupon: shippingPage.data?.cart?.applied_coupons?.map((coupon) => coupon?.code),
        items: shippingPage.data?.cart?.items?.map((item) => ({
          item_id: item?.product.sku,
          item_name: item?.product.name,
          currency: item?.prices?.price.currency,
          discount: item?.prices?.discounts?.reduce(
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            (sum, discount) => sum + (discount?.amount?.value ?? 0),
            0,
          ),
          price: item?.prices?.price.value,
          quantity: item?.quantity,
        })),
      })

      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }

  console.log(shippingPage.data?.cart)

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Shipping')} metaRobots={['noindex']} />
      <WaitForQueries
        waitFor={[shippingPage, customerAddresses]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title='Loading'>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {shippingPage.error && <ApolloCartErrorFullPage error={shippingPage.error} />}
        {!shippingPage.error && !cartExists && <EmptyCart />}
        {!shippingPage.error && cartExists && (
          <ComposedForm>
            <LayoutHeader
              switchPoint={0}
              primary={
                <ComposedSubmit
                  onSubmitSuccessful={() => router.push('/checkout/payment')}
                  render={(renderProps) => (
                    <ComposedSubmitLinkOrButton {...renderProps}>
                      <Trans id='Next' />
                    </ComposedSubmitLinkOrButton>
                  )}
                />
              }
              divider={
                <Container maxWidth='md'>
                  <Stepper currentStep={2} steps={3} />
                </Container>
              }
            >
              <LayoutTitle size='small' icon={iconBox}>
                <Trans id='Shipping' />
              </LayoutTitle>
            </LayoutHeader>
            <Container maxWidth='md'>
              <>
                {customerAddresses.data?.customer?.addresses ? (
                  <CustomerAddressForm step={2} sx={(theme) => ({ mt: theme.spacings.lg })}>
                    <ShippingAddressForm ignoreCache step={3} />
                  </CustomerAddressForm>
                ) : (
                  <>
                    <Typography
                      variant='h4'
                      gutterBottom
                      sx={(theme) => ({ mt: theme.spacings.lg, mb: theme.spacings.sm })}
                    >
                      <Trans id='Personal details' />
                    </Typography>
                    <EmailForm step={1} />
                    <ShippingAddressForm step={3} />
                  </>
                )}

                <ShippingMethodForm step={4} sx={(theme) => ({ mt: theme.spacings.lg })}>
                  <PickupLocationSelector step={5} />
                </ShippingMethodForm>

                <ComposedSubmit
                  onSubmitSuccessful={() => router.push('/checkout/payment')}
                  render={(renderProps) => (
                    <>
                      <FormActions>
                        <ComposedSubmitButton
                          {...renderProps}
                          size='large'
                          id='next'
                          onClick={clickHandler}
                        >
                          <Trans id='Next' />
                        </ComposedSubmitButton>
                      </FormActions>
                      <ApolloCartErrorAlert
                        error={renderProps.buttonState.isSubmitting ? undefined : renderProps.error}
                      />
                    </>
                  )}
                />
              </>
            </Container>
          </ComposedForm>
        )}
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  sharedKey: () => 'checkout',
}
ShippingPage.pageOptions = pageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(locale)

  const page = staticClient.query({ query: DefaultPageDocument, variables: { url: `checkout` } })
  const layout = staticClient.query({ query: LayoutDocument })

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: { href: '/cart', title: 'Cart' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
