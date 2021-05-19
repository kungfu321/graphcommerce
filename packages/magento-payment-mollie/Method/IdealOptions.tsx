import { MenuItem, TextField } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import {
  PaymentOptionsProps,
  PaymentMethodOptionsNoopDocument,
  PaymentMethodOptionsNoopMutation,
  PaymentMethodOptionsNoopMutationVariables,
} from '@reachdigital/magento-cart-payment-method'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormCompose, useFormPersist, useFormValidFields } from '@reachdigital/react-hook-form'
import React from 'react'

export const selectedOption: { issuer?: string } = {
  issuer: undefined,
}

export default function MollieIdealOptions(props: PaymentOptionsProps) {
  const { mollie_available_issuers = [] } = props
  const { code, step, Container } = props
  const formClasses = useFormStyles()

  const form = useFormGqlMutationCart<
    PaymentMethodOptionsNoopMutation,
    PaymentMethodOptionsNoopMutationVariables & { issuer?: string }
  >(PaymentMethodOptionsNoopDocument, {
    mode: 'onChange',
    defaultValues: { code },
  })

  const { handleSubmit, watch, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: `PaymentMethodOptions_${code}` })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })
  const valid = useFormValidFields(form, required)
  selectedOption.issuer = watch('issuer')

  return (
    <Container>
      <form onSubmit={submit} noValidate>
        <div className={formClasses.formRow}>
          <TextField
            variant='outlined'
            select
            error={formState.isSubmitted && !!formState.errors.issuer}
            helperText={formState.isSubmitted && formState.errors.issuer?.message}
            label='Bank'
            required
            {...muiRegister('issuer', { required: true, minLength: 2 })}
            InputProps={{
              endAdornment: <InputCheckmark show={valid.issuer} />,
            }}
          >
            <MenuItem value='' />
            {mollie_available_issuers?.map((issuer) => {
              if (!issuer?.code || !issuer.name) return null
              return (
                <MenuItem key={issuer.code} value={issuer.code}>
                  {issuer.name}
                </MenuItem>
              )
            })}
          </TextField>
        </div>
      </form>
    </Container>
  )
}