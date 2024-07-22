'use client'
import { useSpring, a } from '@react-spring/web'
import { useCanvasApi } from 'app/Canvas'
import { useEffect } from 'react'

export function Spinner() {
  const isLoaded = useCanvasApi((state) => state.isLoaded)
  const isLazyLoaded = useCanvasApi((state) => state.isLazyLoaded)

  const [props, springApi] = useSpring(() => ({ opacity: isLazyLoaded ? 0 : 1 }))

  useEffect(() => {
    if (isLoaded) {
      springApi.start({ opacity: 0 })
    }
  }, [isLoaded, springApi])

  return (
    <a.div
      className="pointer-events-none fixed flex h-screen w-screen select-none place-content-center items-center"
      style={props}
    >
      <div className="m-[100px auto] h-14 w-14 animate-rotateplane bg-gray-800 dark:bg-white" />
    </a.div>
  )
}
