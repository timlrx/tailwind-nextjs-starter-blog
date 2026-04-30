import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import { PageTransition } from '@/lib/transitions/PageTransition'

const LayoutWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface-base">
      <SectionContainer>
        <div className="flex min-h-screen flex-col">
          <header className="flex items-center justify-between py-6">
            <div>
              <Link href="/home" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-text-primary">
                    {siteMetadata.headerTitle}
                  </span>
                </div>
              </Link>
            </div>
            <nav className="flex items-center gap-1">
              <div className="hidden md:flex md:items-center md:gap-1">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <MobileNav />
            </nav>
          </header>
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </SectionContainer>
    </div>
  )
}

export default LayoutWrapper
