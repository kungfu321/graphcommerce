import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import DebugSpacer from 'components/Debug/DebugSpacer'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import PageLink from 'components/PageTransition/PageLink'
import { registerRouteUi } from 'components/PageTransition/historyHelpers'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { useState } from 'react'

type PageComponent = PageFC<{ url: string }, PageLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string[] }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string[] }>

const cycles = [100, 200, 1000, 2000]

const AppShellTextOverlay: PageComponent = ({ url }) => {
  const title = `Overlay ${url?.charAt(0).toUpperCase() + url?.slice(1)}`
  const [cycle, setCycle] = useState(url === 'index' ? 0 : 3)

  return (
    <BottomDrawerUi title={title}>
      <ul>
        <li>
          <PageLink href='/test/deeper'>To default layout</PageLink>
        </li>
        {url === 'index' && (
          <li>
            <PageLink href='/test/overlay/deeper'>Deeper</PageLink>
          </li>
        )}
        {url === 'deeper' && (
          <>
            <li>
              <PageLink href='/test/overlay/index'>Shallower</PageLink>
            </li>
            <li>
              <PageLink href='/test/overlay/even-deeper'>Even deeper</PageLink>
            </li>
          </>
        )}
        {url === 'even-deeper' && (
          <li>
            <PageLink href='/test/overlay/index'>Shallower</PageLink>
          </li>
        )}
      </ul>
      {/* <div style={{ marginLeft: url === 'index' ? 0 : 150 }}>
        <motion.img
          src='/manifest/icon.png'
          alt=''
          layoutId='img1'
          width={366}
          height={344}
          style={{ position: 'relative', zIndex: 5 }}
          transition={{ type: 'tween' }}
          initial={{ zIndex: 0 }}
          animate={{ zIndex: 5 }}
          exit={{ zIndex: 0 }}
        />
      </div> */}
      <DebugSpacer height={cycles[cycle]} onClick={() => setCycle((cycle + 1) % cycles.length)} />
    </BottomDrawerUi>
  )
}
AppShellTextOverlay.Layout = PageLayout

registerRouteUi('/test/overlay/[...url]', BottomDrawerUi)

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  return {
    paths: [{ params: { url: ['index'] } }, { params: { url: ['deeper'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  if (!ctx.params) throw new Error('No params')

  const client = apolloClient()
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  await getStoreConfig(client)
  const staticClient = apolloClient()
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      ...(await layoutHeader),
      url: ctx.params.url.join('/'),
      apolloState: client.cache.extract(),
    },
  }
}