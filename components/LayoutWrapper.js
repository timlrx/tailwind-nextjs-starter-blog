import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="container mx-auto flex max-w-3xl items-center justify-between py-8 xl:py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle} className="hover:no-underline">
              <div className="flex items-center justify-between bg-transparent hover:text-blue-600 dark:hover:fill-blue-500 dark:hover:text-blue-700 dark:hover:text-primary-400">
                {/* <div className="mr-3">
                  <Logo className="w-12 fill-current lg:w-16" />
                </div> */}
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold icon-space-sm icon-after icon-home sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => {
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="rounded-md p-1 font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 hover:no-underline dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-blue-400 sm:p-4"
                  >
                    {link.title}
                  </Link>
                )
              })}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto px-4 lg:px-6">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
