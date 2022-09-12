import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePanelbear } from '@panelbear/panelbear-nextjs';
import { useCreateStore, Provider } from '../store'
import { onAuthStateChanged } from '../actions'

import Footer from '../components/Footer'
import Snack from '../components/Snack'

import '../globals.css'

const App = ({ Component, pageProps } : AppProps) => {
  const store = useCreateStore(pageProps.state);

  const router = useRouter()
  const excludeFooter: string[] = []

  usePanelbear(process.env.PANEL_BEAR_ID || '');

  useEffect(() => {
    const { data: authListener } = onAuthStateChanged()
    const token = router.asPath.includes('#')
    if(token) {
      window.history.go(-2)
    }

    return () => {
        authListener?.unsubscribe();
    };
  });

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
          <Component {...pageProps} />
          {!excludeFooter.includes(router.pathname) && <Footer />}
          <Snack />
        </div>
      </Provider>
    </>
  )
}

export default App;