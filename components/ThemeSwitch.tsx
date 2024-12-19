'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const Blank = () => <svg aria-hidden="true" className="h-8 w-8" />

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-6 w-6"
  >
    {children}
  </svg>
)

const Sun = () => (
  <Icon>
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </Icon>
)

const Moon = () => (
  <Icon>
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </Icon>
)

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme() // Ensure the component is mounted before displaying the UI
  useEffect(() => setMounted(true), [])

  return (
    <div className="mr-5 flex items-center justify-center">
      {!mounted ? (
        <Blank />
      ) : (
        <button
          aria-label={resolvedTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          type="button"
          className="rounded p-1 duration-300 hover:scale-110 hover:text-primary-500 dark:hover:text-primary-400"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? <Sun /> : <Moon />}
        </button>
      )}
    </div>
  )
}

export default ThemeSwitch
