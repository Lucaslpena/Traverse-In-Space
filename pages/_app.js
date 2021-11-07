import Head from 'next/head'
import '../styles/globals.css'
import 'react-notion-x/src/styles.css'
import { IdProvider } from '@radix-ui/react-id';


function App({ Component, pageProps }) {
  return(
    <IdProvider>
      <Head>
        <title>Traverse in Space</title>
        {/* todo -- meta  tags here*/}
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </IdProvider>
  )
}

export default App
