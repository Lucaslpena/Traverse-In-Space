import Head from 'next/head'
import '../styles/globals.scss'
import 'react-notion-x/src/styles.css'
import { IdProvider } from '@radix-ui/react-id';


function App({ Component, pageProps }) {
  return(
    <>

      <Head>
        <title>Traverse in Space</title>
        {/* todo -- meta  tags here*/}
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Urbanist/Urbanist-VariableFont_wght.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </>
  )
}

export default App
