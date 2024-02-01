import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'
import Logo from '../public/static/images/logo.png'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10 backdrop-blur-sm z-10 rounded-b-lg p-4">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between gap-3 ">
            <Image className="rounded-md" src={Logo} alt="logo" width={36} height={36} />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden px-2 text-2xl font-bold sm:block">
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
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-opacity-10 sm:p-4"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
