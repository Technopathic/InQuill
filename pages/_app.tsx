import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { usePanelbear } from '@panelbear/panelbear-nextjs';
import { useCreateStore, Provider } from '../store'

import Header from '../components/Header'
import Footer from '../components/Footer'

import '../globals.css'

const App = ({ Component, pageProps } : AppProps) => {
  const store = useCreateStore(pageProps.state);

  const router = useRouter()
  const excludeHeader: string[] = []
  const excludeFooter: string[] = []

  usePanelbear(process.env.PANEL_BEAR_ID || '');

  return (
    <>
     <Head>
        <meta charSet="utf-8" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <meta name="og:image" property="og:image" content={process.env.APP_IMAGE} />
        <meta name="og:image:secure_url" property="og:image:secure_url" content={process.env.APP_IMAGE} />

        <title>{process.env.APP_TITLE}</title>
      </Head>
      <Provider createStore={store}>
        <div className="flex flex-col justify-between min-h-screen text-gray-700 dark:text-gray-50">
          {!excludeHeader.includes(router.pathname) && <Header />}
          <Component {...pageProps} />
          {!excludeFooter.includes(router.pathname) && <Footer />}
        </div>
      </Provider>
    </>
  )
}

export default App;