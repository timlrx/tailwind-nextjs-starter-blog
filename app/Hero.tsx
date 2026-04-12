'use client'
import { useLayoutEffect } from 'react'
import { useCanvasApi } from './canvas-state'

export function Hero() {
  const { pause, play } = useCanvasApi()

  useLayoutEffect(() => {
    play()
    return () => pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
