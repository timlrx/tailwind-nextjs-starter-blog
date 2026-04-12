'use client'

import Link from '@/components/Link'
import SearchButton from '@/components/SearchButton'
import { Discord, Github, Twitter } from '@/components/social-icons/icons'
import ThemeSwitch from '@/components/ThemeSwitch'
import { PillButton } from '@/components/gallery/PillButton'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

const NAV_LINKS = headerNavLinks.filter((l) => l.href !== '/')

const iconLinks = [
  { href: siteMetadata.github, Icon: Github, label: 'GitHub' },
  { href: siteMetadata.discord, Icon: Discord, label: 'Discord' },
  { href: siteMetadata.x, Icon: Twitter, label: 'Twitter / X' },
] as const

export function NavPill() {
  const isHome = usePathname() === '/'

  return (
    <>
      {!isHome && (
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="fixed top-3 left-3 z-50 grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full bg-white shadow-[0_1px_6px_rgb(0_0_0/0.08)] ring-1 ring-black/5 transition-colors duration-150 hover:bg-black/3 dark:bg-[#1a1a1a] dark:shadow-[0_1px_6px_rgb(0_0_0/0.3)] dark:ring-white/10 dark:hover:bg-white/5"
        >
          <Logo className="h-[1.2rem] w-[1.2rem] dark:invert" />
        </Link>
      )}

      <nav
        className="fixed top-3 left-[calc(100vw-0.75rem)] z-50 flex -translate-x-full items-center gap-px rounded-full bg-white p-1.5 shadow-[0_1px_6px_rgb(0_0_0/0.08)] ring-1 ring-black/5 sm:left-[calc(100vw-1.75rem)] dark:bg-[#1a1a1a] dark:shadow-[0_1px_6px_rgb(0_0_0/0.3)] dark:ring-white/10"
        aria-label="Site navigation"
      >
        {NAV_LINKS.map(({ href, title }) => (
          <Link
            key={href}
            href={href}
            className="grid h-[1.8rem] place-items-center rounded-full px-3 text-[0.75rem] font-medium text-[#555] transition-colors duration-150 hover:bg-black/6 hover:text-[#111] dark:text-[#aaa] dark:hover:bg-white/8 dark:hover:text-white"
          >
            {title}
          </Link>
        ))}

        <span
          className="mx-0.5 hidden h-4 w-px bg-black/10 sm:block dark:bg-white/10"
          aria-hidden
        />

        <div className="hidden items-center gap-px sm:flex">
          <PillButton
            tooltip="Search"
            className="grid h-[1.8rem] w-[1.8rem] place-items-center [&_button]:!p-0 [&_svg]:h-[0.95rem] [&_svg]:w-[0.95rem]"
          >
            <SearchButton />
          </PillButton>

          <PillButton
            tooltip="Theme"
            className="grid h-[1.8rem] w-[1.8rem] place-items-center [&_button]:!p-0 [&_svg]:h-[0.95rem] [&_svg]:w-[0.95rem]"
          >
            <ThemeSwitch />
          </PillButton>

          {iconLinks.map(({ href, Icon, label }) =>
            href ? (
              <PillButton
                key={label}
                tooltip={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-[1.8rem] w-[1.8rem] place-items-center"
              >
                <Icon className="h-[0.95rem] w-[0.95rem] fill-current" />
              </PillButton>
            ) : null
          )}
        </div>

        <MobileMoreMenu />
      </nav>
    </>
  )
}

function MobileMoreMenu() {
  return (
    <Menu as="div" className="relative sm:hidden">
      <MenuButton
        aria-label="More actions"
        className="grid h-[1.8rem] w-[1.8rem] place-items-center rounded-full text-[#555] transition-colors duration-150 hover:bg-black/6 hover:text-[#111] dark:text-[#aaa] dark:hover:bg-white/8 dark:hover:text-white"
      >
        <svg viewBox="0 0 16 16" aria-hidden className="h-[0.95rem] w-[0.95rem] fill-current">
          <circle cx="3" cy="8" r="1.25" />
          <circle cx="8" cy="8" r="1.25" />
          <circle cx="13" cy="8" r="1.25" />
        </svg>
      </MenuButton>

      <MenuItems
        static={false}
        className="absolute top-full right-0 z-[60] mt-2 min-w-[12rem] rounded-2xl bg-white p-2 shadow-[0_10px_30px_rgb(0_0_0/0.12)] ring-1 ring-black/5 focus:outline-none dark:bg-[#1a1a1a] dark:ring-white/10"
      >
        <div className="flex flex-col gap-1">
          {/* Search — whole row triggers the nested SearchButton */}
          <button
            type="button"
            className="flex h-10 w-full cursor-pointer items-center rounded-xl px-3 text-[#555] hover:bg-black/6 dark:text-[#aaa] dark:hover:bg-white/8"
            onClick={(e) => {
              const btn = e.currentTarget.querySelector<HTMLButtonElement>('[aria-label="Search"]')
              if (btn) btn.click()
            }}
          >
            <span className="text-[0.8rem] font-medium">Search</span>
            <div className="ml-auto flex h-[0.95rem] w-[0.95rem] items-center justify-center [&_button]:!p-0 [&_svg]:h-[0.95rem] [&_svg]:w-[0.95rem]">
              <SearchButton />
            </div>
          </button>

          {/* Theme — inline buttons to avoid nested Headless UI Menu */}
          <MobileThemeRow />

          <div className="my-1 h-px bg-black/10 dark:bg-white/10" />

          {iconLinks.map(({ href, Icon, label }) =>
            href ? (
              <MenuItem key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center rounded-xl px-3 text-[#555] transition-colors hover:bg-black/6 hover:text-[#111] dark:text-[#aaa] dark:hover:bg-white/8 dark:hover:text-white"
                >
                  <span className="text-[0.8rem] font-medium">{label}</span>
                  <Icon className="ml-auto h-[0.95rem] w-[0.95rem] fill-current" />
                </a>
              </MenuItem>
            ) : null
          )}
        </div>
      </MenuItems>
    </Menu>
  )
}

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Auto' },
] as const

function MobileThemeRow() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex h-10 items-center rounded-xl px-3 text-[#555] dark:text-[#aaa]">
      <span className="text-[0.8rem] font-medium">Theme</span>
      <div className="ml-auto flex gap-1">
        {themeOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`rounded-lg px-2 py-1 text-[0.7rem] font-medium transition-colors ${
              theme === opt.value
                ? 'bg-black/8 text-[#111] dark:bg-white/12 dark:text-white'
                : 'text-[#999] hover:text-[#555] dark:text-[#666] dark:hover:text-[#aaa]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
