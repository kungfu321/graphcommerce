import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useEffect } from 'react'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals/attribution'
import { sendEvent } from '../api/sendEvent'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'dataLayer.coreWebVitals'

/** When a product is added to the Cart, send a Google Analytics event.
 *
 * Based on this information: https://github.com/GoogleChrome/web-vitals?tab=readme-ov-file#send-the-results-to-google-analytics
 */
function GoogleDatalayerCoreWebVitals(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  const sendCoreWebVitals = useEventCallback((m: Metric, debug_target?: string | undefined) => {
    sendEvent(`cwv_${m.name.toLowerCase()}`, {
      value: m.delta,
      debug_target,
      ...Object.fromEntries(Object.entries(m).map(([key, value]) => [`metric_${key}`, value])),
    })
  })

  useEffect(() => {
    const opts = { reportAllChanges: true }
    onCLS((m) => sendCoreWebVitals(m, m.attribution.largestShiftTarget))
    onFCP((m) => sendCoreWebVitals(m), opts)
    onFID((m) => sendCoreWebVitals(m, m.attribution.eventTarget), opts)
    onINP((m) => sendCoreWebVitals(m, m.attribution.eventTarget), opts)
    onLCP((m) => sendCoreWebVitals(m, m.attribution.element), opts)
    onTTFB((m) => sendCoreWebVitals(m), opts)
  }, [sendCoreWebVitals])

  return <Prev {...rest} />
}

export const Plugin = GoogleDatalayerCoreWebVitals
