import Head from 'next/head'
import '../styles/globals.scss'
import 'react-notion-x/src/styles.css'
import { IdProvider } from '@radix-ui/react-id';
import {TopBar} from '../components';
import { MobileHeaderProvider } from '../lib/MobileHeaderContext';

function App({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Traverse in Space</title>
        {/* todo -- meta  tags here*/}
        <meta name="description" content="" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#b91d47"/>
        <meta name="theme-color" content="#ffffff"/>
        <link
          rel="preload"
          href="/fonts/Urbanist/Urbanist-VariableFont_wght.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <IdProvider>
        <MobileHeaderProvider>
          <TopBar />
          <Component {...pageProps} />
        </MobileHeaderProvider>
      </IdProvider>
    </>
  )
}

export default App
