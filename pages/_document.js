import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/Urbanist/Urbanist-Italic-VariableFont_wght.ttf"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/Urbanist/Urbanist-VariableFont_wght.ttf"
          as="font"
          type="font/woff2"
        />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}