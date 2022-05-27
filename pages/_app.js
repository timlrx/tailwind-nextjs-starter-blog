import "@/css/tailwind.css"
import "@/css/prism.css"
import "katex/dist/katex.css"

import "@fontsource/inter/variable-full.css"

import { ThemeProvider } from "next-themes"
import Head from "next/head"

import siteMetadata from "@/data/siteMetadata"
import Analytics from "@/components/analytics"
import LayoutWrapper from "@/components/LayoutWrapper"
import { ClientReload } from "@/components/ClientReload"

const isDevelopment = process.env.NODE_ENV === "development"
const isSocket = process.env.SOCKET
import * as snippet from "@segment/snippet"

function renderSnippet() {
  const opts = {
    apiKey: process.env.SEGMENT_API_KEY, // to do
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  }
  // if (NODE_ENV === 'development') {
  //   return snippet.max(opts)
  // }

  return snippet.min(opts)
}
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID=${process.env.CRISP_WEBSITE_ID};(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: renderSnippet(),
          }}
          defer
        />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
