import { FormControl } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { useForm, Controller, useFormPersist } from '@reachdigital/react-hook-form'
import React, { useEffect } from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodToggleProps = Record<string, unknown>

export default function PaymentMethodToggle(props: PaymentMethodToggleProps) {
  const {
    methods,
    selectedMethod,
    setSelectedMethod,
    setSelectedModule,
    modules,
  } = usePaymentMethodContext()

  const classes = useFormStyles()

  const form = useForm<{ code: string; paymentMethod?: string }>({
    mode: 'onChange',
    defaultValues: { code: selectedMethod?.code },
  })
  useFormPersist({ form, name: 'PaymentMethodToggle' })

  const { control, handleSubmit, watch, register, setValue } = form
  const submitHandler = handleSubmit(() => {})

  const paymentMethod = watch('paymentMethod')
  useEffect(() => {
    const [code, child] = paymentMethod?.split('___') ?? ['']
    if (code === selectedMethod?.code) return

    const foundMethod = methods.find(
      (method) => method.code === code && (!child || method.child === child),
    )
    if (foundMethod && !modules?.[foundMethod?.code ?? '']) {
      console.log('no payment method found for method', foundMethod)
    }
    setSelectedMethod(foundMethod)
    setSelectedModule(modules?.[foundMethod?.code ?? ''])
  }, [methods, modules, paymentMethod, selectedMethod?.code, setSelectedMethod, setSelectedModule])

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <input type='hidden' {...register('code', { required: true })} required />
      <div className={classes.formRow}>
        <FormControl>
          <Controller
            defaultValue=''
            control={control}
            name='paymentMethod'
            rules={{ required: 'Please select a payment method' }}
            render={({ field: { onChange, value, name, ref, onBlur } }) => (
              <ToggleButtonGroup
                onChange={(_, val: string) => {
                  onChange(val)
                  setValue('code', val?.split('___')[0])
                }}
                defaultValue=''
                aria-label='Payment Method'
                onBlur={onBlur}
                value={value}
                required
                exclusive
              >
                {methods?.map((pm) => (
                  <ToggleButton key={`${pm.code}___${pm.child}`} value={`${pm.code}___${pm.child}`}>
                    {pm?.title}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
        </FormControl>
      </div>
    </form>
  )
}
