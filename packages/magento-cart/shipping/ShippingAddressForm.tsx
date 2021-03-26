import { useQuery } from '@apollo/client'
import { TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import AddressFields from '@reachdigital/magento-customer/AddressFields'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import NameFields from '@reachdigital/magento-customer/NameFields'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormAutoSubmit from '@reachdigital/react-hook-form/useFormAutoSubmit'
import useFormCheckmarks from '@reachdigital/react-hook-form/useFormCheckmarks'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import useFormPersist from '@reachdigital/react-hook-form/useFormPersist'
import { phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { CountryRegionsQuery } from '../countries/CountryRegions.gql'
import { ShippingAddressFormDocument } from './ShippingAddressForm.gql'

type ShippingAddressFormProps = CountryRegionsQuery & {
  doSubmit: React.MutableRefObject<(() => Promise<boolean>) | undefined>
}

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
  const { countries, doSubmit } = props
  const classes = useFormStyles()
  const ref = useRef<HTMLFormElement>(null)
  const { data: cartQuery } = useQuery(ClientCartDocument)
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const currentCustomer = customerQuery?.customer
  const currentCountryCode = currentAddress?.country.code ?? 'NLD'

  const form = useFormGqlMutation(ShippingAddressFormDocument, {
    defaultValues: {
      cartId: cartQuery?.cart?.id,
      // todo(paales): change to something more sustainable
      firstname: currentAddress?.firstname ?? currentCustomer?.firstname ?? undefined, // todo: allow for null values in defaultValues
      lastname: currentAddress?.lastname ?? currentCustomer?.lastname ?? undefined,
      telephone:
        currentAddress?.telephone !== '000 - 000 0000' ? currentAddress?.telephone : undefined,
      city: currentAddress?.city,
      company: currentAddress?.company,
      postcode: currentAddress?.postcode ?? '',
      street: currentAddress?.street?.[0] ?? undefined,
      houseNumber: currentAddress?.street?.[1] ?? undefined,
      addition: currentAddress?.street?.[2] ?? undefined,
      region: currentAddress?.region?.label,
      regionId: currentAddress?.region?.region_id,
      countryCode: currentCountryCode, // todo: replace by the default shipping country of the store + geoip
    },
    mode: 'onChange',
    onBeforeSubmit: (variables) => {
      const regionId = countries
        ?.find((country) => country?.two_letter_abbreviation === variables.countryCode)
        ?.available_regions?.find((region) => region?.id === variables.regionId)?.id

      return { ...variables, regionId, saveInAddressBook: true, customerNote: '' }
    },
  })
  const { register, errors, handleSubmit, watch, formState, required, error } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: 'ShippingAddressForm' })

  const autoSubmitting = useFormAutoSubmit({
    form,
    submit,
    fields: ['postcode', 'countryCode', 'regionId'],
  })

  const disableFields = formState.isSubmitting && !autoSubmitting

  // todo: Move to a validateAndSubmit method or something?
  useEffect(() => {
    doSubmit.current = async () =>
      !formState.isDirty ? Promise.resolve(true) : submit().then(() => true)
  }, [doSubmit, formState.isDirty, submit])

  const { checkmarks } = useFormCheckmarks({
    formMethods: { watch, required, errors },
    icon: <CheckIcon className={classes.checkmark} />,
  })

  return (
    <form onSubmit={submit} noValidate className={classes.form} ref={ref}>
      <AnimatePresence initial={false}>
        <NameFields
          {...form}
          key='namefields'
          checkmarks={checkmarks}
          disableFields={disableFields}
          fieldOptions={{
            firstname: {
              name: 'firstname',
              required: required.firstname,
            },
            lastname: {
              name: 'lastname',
              required: required.lastname,
            },
          }}
        />
        <AddressFields
          {...form}
          key='addressfields'
          checkmarks={checkmarks}
          countryCode={currentCountryCode}
          countries={countries}
          disableFields={disableFields}
          fieldOptions={{
            street: {
              name: 'street',
              required: required.street,
            },
            houseNumber: {
              name: 'houseNumber',
              required: required.houseNumber,
            },
            addition: {
              name: 'addition',
              required: required.addition,
            },
            postcode: {
              name: 'postcode',
              required: required.postcode,
            },
            city: {
              name: 'city',
              required: required.city,
            },
            countryCode: {
              name: 'countryCode',
              required: required.countryCode,
            },
            regionId: {
              name: 'regionId',
              required: required.regionId,
            },
          }}
        />

        <div className={classes.formRow} key='telephone'>
          <TextField
            variant='outlined'
            type='text'
            error={!!errors.telephone}
            required={required.telephone}
            name='telephone'
            label='Telephone'
            inputRef={register({
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && errors.telephone?.message}
            disabled={disableFields}
            InputProps={{
              endAdornment: checkmarks.telephone,
            }}
          />
        </div>

        <ApolloErrorAlert error={error} />
      </AnimatePresence>
    </form>
  )
}
