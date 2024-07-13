'use client'

import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { usePathname } from 'next/navigation'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'
import SocialIcon from './social-icons'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSpring, a } from '@react-spring/web'

const PmndrsHeader = () => {
  const linksRef = useRef<HTMLDivElement>(null!)
  const homeRef = useRef<HTMLDivElement>(null!)
  const sectionRef = useRef<HTMLElement | null>(null)

  const pathname = usePathname()
  const isHome = pathname === '/'
  const prevIsHome = useRef(isHome)

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

  // Get the section element which we will use for measuring content dimensions.
  useLayoutEffect(() => {
    if (sectionRef.current) return
    sectionRef.current = document.querySelector('section')
    return () => {
      sectionRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    if (!linksRef.current || !sectionRef.current) return

    const linksWidth = linksRef.current.offsetWidth
    const sectionWidthWithoutPadding =
      parseFloat(window.getComputedStyle(sectionRef.current).width) -
      parseFloat(window.getComputedStyle(sectionRef.current).paddingLeft) -
      parseFloat(window.getComputedStyle(sectionRef.current).paddingRight)
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
      <header className="absolute left-[calc((100%-100vw)/2)] top-0 z-[1] flex h-[130px] w-[100%] items-center py-10">
        <a.div
          ref={homeRef}
          className="absolute"
          style={{ x: props.homeX, opacity: props.homeOpacity }}
        >
          {!isHome && (
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <Logo className="size-10 dark:invert" />
              </div>
            </Link>
          )}
        </a.div>
        <a.div
          ref={linksRef}
          className="flex flex-col items-end gap-[8px]"
          style={{ x: props.linksX, opacity: props.linkOpacity }}
        >
          <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400
              sm:block"
                >
                  {link.title}
                </Link>
              ))}
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>

          <div className="mt-[8px] hidden space-x-4 sm:flex sm:space-x-6">
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="discord" href={siteMetadata.discord} size={6} />
            <SocialIcon kind="twitter" href={siteMetadata.x} size={6} />
          </div>
        </a.div>
      </header>
      {/* A filler so there header takes up space in flow. */}
      <div className="h-[90px] shrink-0" />
    </>
  )
}

export default PmndrsHeader
