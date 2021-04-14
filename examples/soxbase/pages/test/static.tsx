import { Button, Container } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import PageLink from 'next/link'
import React from 'react'

function TestStatic() {
  const title = `Testpage no GSP`

  return (
    <FullPageUi title={title} backFallbackTitle='Test' backFallbackHref='/test/index'>
      <Container>
        <PageLink href='/test/index' passHref>
          <Button variant='outlined' color='secondary'>
            Index
          </Button>
        </PageLink>

        <PageLink href='/test/overlay/static' passHref>
          <Button variant='outlined' color='secondary'>
            Overlay static
          </Button>
        </PageLink>
      </Container>
    </FullPageUi>
  )
}

TestStatic.Layout = PageLayout

export default TestStatic
