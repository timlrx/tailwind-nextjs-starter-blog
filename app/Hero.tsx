'use client'
import { useLayoutEffect } from 'react'
import { useCanvasApi } from './Canvas'

export function Hero() {
  const { pause, play } = useCanvasApi()

  useLayoutEffect(() => {
    play()
    return () => pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
