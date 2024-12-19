'use client'

import { useState, useCallback, useEffect } from 'react'
import useDetectScroll from '@smakss/react-scroll-direction'
import { useMediaQuery } from '@hooks'
import { motion, useAnimate } from 'motion/react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const { navStyle } = siteMetadata

const NAV_DEFAULT = navStyle === 'default'
const NAV_FIXED = navStyle === 'fixed'
const NAV_DYNAMIC = navStyle === 'dynamic'

const TRIGGER_HEIGHT = 96

const Header = () => {
  const [scope, animate] = useAnimate()
  const { scrollPosition, scrollDir } = useDetectScroll({ thr: 20 })
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isNavDynamic, setIsNavDynamic] = useState(false)
  const [isNavFloating, setIsNavFloating] = useState(false)
  const [navWidth, setNavWidth] = useState('100%')
  const [floatingNavWidth, setFloatingNavWidth] = useState('96%')
  const [isNavShadow, setIsNavShadow] = useState(false)

  const isMd = useMediaQuery('screen and (min-width: 768px)')
  const isXl = useMediaQuery('screen and (min-width: 1280px)')

  const handleScroll = useCallback(() => {
    const SCROLL_TOP = scrollPosition.top
    const SCROLL_UP = scrollDir === 'up'

    setIsNavVisible(SCROLL_TOP <= TRIGGER_HEIGHT)
    setIsNavDynamic(SCROLL_TOP > TRIGGER_HEIGHT)
    setIsNavFloating(SCROLL_TOP > TRIGGER_HEIGHT && SCROLL_UP)
    setIsNavShadow(NAV_DYNAMIC && SCROLL_TOP > TRIGGER_HEIGHT)
  }, [scrollPosition, scrollDir])

  useEffect(() => {
    if (!NAV_DYNAMIC) return

    handleScroll()
  }, [scrollPosition, scrollDir, handleScroll])

  const handleNavWidthChange = (navWidth: string, floatingNavWidth: string) => {
    const WIDTH = isNavFloating ? floatingNavWidth : navWidth

    animate(scope.current, { width: WIDTH }, { duration: 0 })
  }

  useEffect(() => {
    if (!NAV_DYNAMIC) return

    let navWidth: string
    let floatingNavWidth: string

    if (isXl) {
      navWidth = '67rem'
      floatingNavWidth = '65.5rem'

      setNavWidth(navWidth)
      setFloatingNavWidth(floatingNavWidth)
    } else if (isMd) {
      navWidth = '48rem'
      floatingNavWidth = '46.5rem'

      setNavWidth(navWidth)
      setFloatingNavWidth(floatingNavWidth)
    } else {
      navWidth = '100%'
      floatingNavWidth = '96%'

      setNavWidth(navWidth)
      setFloatingNavWidth(floatingNavWidth)
    }

    handleNavWidthChange(navWidth, floatingNavWidth)
  }, [isMd, isXl])

  useEffect(() => {
    const MUST_SHOW_NAV = isNavVisible && !isNavDynamic && !isNavFloating
    const MUST_HIDE_NAV = !isNavVisible && isNavDynamic && !isNavFloating
    const MUST_SHOW_FLOATING_NAV = isNavDynamic && isNavFloating

    if (MUST_SHOW_NAV) {
      animate(scope.current, { top: 0, height: '6rem', width: navWidth }, { duration: 0.5 })
    }
    if (MUST_HIDE_NAV) {
      animate(
        scope.current,
        { top: '-4.2rem', height: '4.2rem', width: floatingNavWidth },
        { duration: 0.5 }
      )
    }
    if (MUST_SHOW_FLOATING_NAV) {
      animate(
        scope.current,
        { top: '1vw', height: '4.2rem', width: floatingNavWidth },
        { duration: 0.5 }
      )
    }
  }, [isNavVisible, isNavDynamic, isNavFloating])

  return (
    <header>
      <motion.nav
        className={`flex h-[6rem] w-full items-center justify-between bg-white dark:bg-gray-950 print:hidden
        ${NAV_FIXED ? 'fixed inset-x-0 top-0 z-50' : ''}
        ${NAV_DYNAMIC ? 'fixed inset-x-0 top-0 z-50 rounded-md bg-white/30 backdrop-blur dark:bg-gray-950/30' : ''}
        ${!NAV_DEFAULT ? 'mx-auto px-4 sm:px-6 md:w-[48rem] xl:w-[67rem]' : ''}
        ${isNavShadow ? 'shadow-white-300 shadow-md dark:shadow-gray-800' : ''}`}
        ref={scope}
      >
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
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </motion.nav>
      {!NAV_DEFAULT && <div aria-hidden="true" className="h-[6rem] print:hidden"></div>}
    </header>
  )
}

export default Header
