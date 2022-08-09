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
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:flex ">
              {headerNavLinks.map((link) => (
                <>
                  <Link key={link.title} href={link.href}>
                    <div className="before:duration.25s relative inline-block p-1 pt-4 pb-2 font-medium text-gray-900 before:absolute before:right-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-white before:bg-gradient-to-tr before:from-[#4FDCF0] before:to-[#10BBD8] before:transition-all before:ease-out before:content-[''] hover:before:left-0 hover:before:right-auto hover:before:w-full dark:text-gray-100 sm:mx-4">
                      {link.title}
                    </div>
                  </Link>
                </>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
