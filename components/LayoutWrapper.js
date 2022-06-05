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
        <header className="container mx-auto flex max-w-3xl items-center justify-between px-4 py-8 md:px-0 xl:py-10">
          <div className="flex items-center text-base leading-5">
            <Link
              href="/"
              aria-label={siteMetadata.headerTitle}
              className="hover:text-blue-600 hover:no-underline dark:hover:fill-blue-500 dark:hover:text-blue-700 dark:hover:text-primary-400"
            >
              <div className="flex items-center justify-between bg-transparent">
                <div className="mr-3">
                  <Logo className="w-12 fill-current lg:w-16" />
                </div>
                <div className="hidden pr-2 font-semibold md:block">Home</div>
              </div>
            </Link>
            <div className="">
              {headerNavLinks.map((link) => {
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="px-2 font-semibold text-gray-900 hover:text-blue-700 hover:no-underline dark:text-gray-100 dark:hover:text-blue-400 sm:px-3"
                  >
                    {link.title}
                  </Link>
                )
              })}
            </div>
            {/* <MobileNav /> */}
          </div>

          <ThemeSwitch />
        </header>
        <main className="mb-auto px-4 lg:px-6">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
