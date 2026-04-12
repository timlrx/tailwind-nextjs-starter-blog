'use client'
import { useSpring, a } from '@react-spring/web'
import { useCanvasApi } from 'app/canvas-state'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function Spinner() {
  const isLoaded = useCanvasApi((state) => state.isLoaded)
  const pathname = usePathname()

  const isLazyLoaded = pathname !== '/'

  const [props, springApi] = useSpring(() => ({ opacity: isLazyLoaded ? 0 : 1 }))

  useEffect(() => {
    if (isLoaded) {
      springApi.start({ opacity: 0 })
    }
  }, [isLoaded, springApi])

  return (
    <a.div
      className="pointer-events-none fixed flex h-screen w-screen place-content-center items-center select-none"
      style={props}
    >
      <div className="m-[100px auto] animate-rotateplane h-14 w-14 bg-gray-800 dark:bg-white" />
    </a.div>
  )
}
