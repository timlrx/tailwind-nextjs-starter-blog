import { useState, useEffect } from 'react'

/**
 * Custom hook that tracks whether a media query matches the current window state
 * @param {string} query The media query string to evaluate (e.g., '(min-width: 768px)')
 * @returns {boolean} Boolean indicating if the media query matches
 * @throws {Error} If the media query string is invalid
 */

export function useMediaQuery(query: string): boolean {
  if (typeof query !== 'string' || !query.trim()) {
    throw new Error(
      'Media query must be a non-empty string. Please provide a valid CSS media query.'
    )
  }

  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    const mediaQueryList = window.matchMedia(query)

    setMatches(mediaQueryList.matches)

    mediaQueryList.addEventListener('change', handleChange)
    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
