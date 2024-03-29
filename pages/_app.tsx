import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCreateStore, Provider } from '../store'
import { supabase, setAuthCookie } from '../actions'

import Footer from '../components/Footer'
import Snack from '../components/Snack'

import '../globals.css'

const App = ({ Component, pageProps } : AppProps) => {
  const store = useCreateStore(pageProps.state);

  const router = useRouter()
  const excludeFooter: string[] = ['/qrcode']


  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      //setAuthCookie(event, session);
    });
    
    const token = router.asPath.includes('#')
    if(token) {
      router.push('/')
    }

    return () => {
        //authListener?.unsubscribe();
    };
  }, [router]);

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
          <Snack />
        </div>
      </Provider>
    </>
  )
}

export default App;