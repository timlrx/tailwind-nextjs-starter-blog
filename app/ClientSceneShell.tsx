'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCanvasApi } from './canvas-state'

const PmndrsCanvas = dynamic(() => import('./Canvas'), {
  ssr: false,
})

const Spinner = dynamic(() => import('@/components/Spinner').then((mod) => mod.Spinner), {
  ssr: false,
})

export default function ClientSceneShell() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const pause = useCanvasApi((state) => state.pause)
  const reset = useCanvasApi((state) => state.reset)
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false)

  useEffect(() => {
    let rafId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    if (!isHome) {
      setShouldRenderCanvas(false)
      pause()
      reset()
      return
    }

    // Let the route transition paint first, then mount WebGL.
    setShouldRenderCanvas(false)
    rafId = window.requestAnimationFrame(() => {
      timeoutId = setTimeout(() => {
        setShouldRenderCanvas(true)
      }, 0)
    })

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      if (timeoutId !== null) clearTimeout(timeoutId)
    }
  }, [isHome, pause, reset])

  if (!isHome) return null

  return (
    <>
      {shouldRenderCanvas && <PmndrsCanvas />}
      <Spinner />
    </>
  )
}
