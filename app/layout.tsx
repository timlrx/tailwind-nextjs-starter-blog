import './globals.css'

import { Inter } from 'next/font/google'
import { Analytics } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} className={`${inter.className} scroll-smooth`}>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <ThemeProviders>
          {/* <Analytics analyticsConfig={siteMetadata.analytics} /> */}
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              {/* <SearchProvider searchConfig={siteMetadata.search}> */}
              <Header />
              <main className="mb-auto">{children}</main>
              {/* </SearchProvider> */}
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
