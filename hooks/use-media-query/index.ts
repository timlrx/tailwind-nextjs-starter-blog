import { useCallback, useSyncExternalStore } from 'react'

/**
 * A React Hook to determine if a device matches a given media query.
 * @param {string} query The media query to check (e.g., `'(min-width: 768px)'`).
 * @returns {boolean} `true` if the device's screen size matches the query, `false` otherwise.
 */

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: (event: MediaQueryListEvent) => void) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener('change', callback)
      return () => {
        matchMedia.removeEventListener('change', callback)
      }
    },
    [query]
  )

  const getSnapshot = (): boolean => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
