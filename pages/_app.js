import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import "styles/tailwind.css";


import '@fontsource/inter/variable-full.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET
export async function getInitialProps ({ Component, router, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
}

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
    const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}> 
    {/* <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}> */}
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      {/* <LayoutWrapper> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </LayoutWrapper> */}
    {/* </ThemeProvider> */}
    </Hydrate>
  </QueryClientProvider>
  
  )
}
