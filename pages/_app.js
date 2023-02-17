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
import TopBanner from "@/components/topBanner"

const isDevelopment = process.env.NODE_ENV === "development"
const isSocket = process.env.SOCKET
import * as snippet from "@segment/snippet"

function renderSnippet() {
  const opts = {
    apiKey: process.env.SEGMENT_API_KEY,
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
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: renderSnippet(),
          }}
          defer
        />
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="img-src data: https://client.crisp.chat https://image.crisp.chat https://storage.crisp.chat; font-src https://client.crisp.chat; media-src https://client.crisp.chat; style-src 'unsafe-inline' https://client.crisp.chat; frame-src https://game.crisp.chat; script-src https://client.crisp.chat https://settings.crisp.chat; connect-src https://client.crisp.chat https://storage.crisp.chat wss://client.relay.crisp.chat wss://stream.relay.crisp.chat"
        ></meta> */}
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <TopBanner />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
