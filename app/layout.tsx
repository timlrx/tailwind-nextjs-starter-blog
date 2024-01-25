import 'css/app.css'
import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import type { Metadata } from 'next'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SearchProvider, SearchConfig } from 'pliny/search'
import { ThemeProviders } from './theme-providers'
import SectionContainer from '@/components/SectionContainer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'HANS',
  description: "HANS's personal website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#abb581" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-dark dark:text-hans-400">
        <ThemeProviders>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main className="mb-auto">{children}</main>
                <div className="bg-image-container bg-image-container-one"></div>
                <div className="bg-image-container bg-image-container-two w-3/6 h-3/6 md:w-3/6 md:h-3/6 "></div>
                {/* <div className="bg-image-container bg-image-container-three"></div> */}
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
        <Analytics />
      </body>
    </html>
  )
}
