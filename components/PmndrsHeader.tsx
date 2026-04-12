'use client'

import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { usePathname, useRouter } from 'next/navigation'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'
import SocialIcon from './social-icons'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSpring, a } from '@react-spring/web'

const PmndrsHeader = () => {
  const router = useRouter()
  const linksRef = useRef<HTMLDivElement>(null!)
  const homeRef = useRef<HTMLDivElement>(null!)
  const sectionRef = useRef<HTMLElement | null>(null)

  const pathname = usePathname()
  const isHome = pathname === '/'
  const prevIsHome = useRef(isHome)
  const prefetchHome = useCallback(() => {
    router.prefetch('/')
  }, [router])

  const [winWidth, setWinWidth] = useState(() =>
    typeof window === 'undefined' ? 0 : window.innerWidth
  )

  // Sub to window resize.
  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [props, springApi] = useSpring(() => ({
    linksX: 0,
    homeX: 0,
    linkOpacity: 0,
    homeOpacity: 0,
  }))

  // Re-query the section element on route change (home has none, inner pages do).
  useLayoutEffect(() => {
    sectionRef.current = document.querySelector('section')
    return () => {
      sectionRef.current = null
    }
  }, [pathname])

  useLayoutEffect(() => {
    if (!linksRef.current) return

    const linksWidth = linksRef.current.offsetWidth
    const section = sectionRef.current
    const sectionWidthWithoutPadding = section
      ? parseFloat(window.getComputedStyle(section).width) -
        parseFloat(window.getComputedStyle(section).paddingLeft) -
        parseFloat(window.getComputedStyle(section).paddingRight)
      : winWidth
    const hasHomeChanged = prevIsHome.current !== isHome

    let linksX = 0
    if (isHome) {
      linksX = winWidth - linksWidth - 40
    } else {
      linksX = winWidth - (winWidth - sectionWidthWithoutPadding) / 2 - linksWidth
    }

    const homeX = (winWidth - sectionWidthWithoutPadding) / 2
    const homeOpacity = isHome ? 0 : 1

    springApi.start({ linkOpacity: 1 })

    if (!hasHomeChanged) {
      springApi.set({ linksX, homeX, homeOpacity })
    } else {
      springApi.start({ linksX, homeX, homeOpacity, config: { tension: 120, friction: 14 } })
    }

    prevIsHome.current = isHome
  }, [winWidth, isHome, springApi, props])

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex h-[130px] w-screen items-center py-10">
        <a.div
          ref={homeRef}
          className="absolute"
          style={{ x: props.homeX, opacity: props.homeOpacity }}
        >
          {!isHome && (
            <Link
              href="/"
              aria-label={siteMetadata.headerTitle}
              onMouseEnter={prefetchHome}
              onFocus={prefetchHome}
              onTouchStart={prefetchHome}
            >
              <div className="flex items-center justify-between">
                <Logo className="size-10 dark:invert" />
              </div>
            </Link>
          )}
        </a.div>
        <a.div
          ref={linksRef}
          className="flex flex-col items-end gap-2"
          style={{ x: props.linksX, opacity: props.linkOpacity }}
        >
          <div className="flex w-full items-center justify-end gap-4 leading-5 sm:gap-6">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 hidden font-medium text-gray-900 sm:block dark:text-gray-100 dark:hover:opacity-60"
                >
                  {link.title}
                </Link>
              ))}
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>

          <div className="hidden w-full items-center justify-end gap-4 sm:flex sm:gap-6">
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="discord" href={siteMetadata.discord} size={6} />
            <SocialIcon kind="twitter" href={siteMetadata.x} size={6} />
          </div>
        </a.div>
      </header>
      {!isHome && <div className="h-[90px] shrink-0" />}
    </>
  )
}

export default PmndrsHeader
