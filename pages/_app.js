import '@/css/tailwind.css'

import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import SEO from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <div className="antialiased">
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
          </Head>
          <DefaultSeo {...SEO} />
          <Head>
            <link
              rel="apple-touch-icon-precomposed"
              sizes="57x57"
              href="apple-touch-icon-57x57.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="114x114"
              href="apple-touch-icon-114x114.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="72x72"
              href="apple-touch-icon-72x72.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="144x144"
              href="apple-touch-icon-144x144.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="120x120"
              href="apple-touch-icon-120x120.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="152x152"
              href="apple-touch-icon-152x152.png"
            />
            <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="application-name" content="&nbsp;" />
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="msapplication-TileImage" content="mstile-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          </Head>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </div>
      </MDXProvider>
    </ThemeProvider>
  )
}
