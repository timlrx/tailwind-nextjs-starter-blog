'use client'

import CausticOverlay from '@/components/scenes/caustic/CausticOverlay'
import CausticScene from '@/components/scenes/caustic/CausticScene'
import { useSpring } from '@react-spring/web'
import { PerformanceMonitor } from '@react-three/drei'
import { Canvas, invalidate, useThree } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { memo, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { create } from 'zustand'

THREE.Texture.DEFAULT_ANISOTROPY = 8

const Scene = memo(CausticScene)

export default function PmndrsCanvas() {
  const parentRef = useRef<HTMLDivElement>(null!)
  const [perfSucks, degrade] = useState(false)
  const isPaused = useCanvasApi((state) => state.isPaused)
  const onPause = useCanvasApi((state) => state.onPause)
  const onPlay = useCanvasApi((state) => state.onPlay)
  const isLoaded = useCanvasApi((state) => state.isLoaded)

  const pathname = usePathname()
  const isHome = useRef(pathname === '/')
  isHome.current = pathname === '/'

  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isHome.current) {
      timeout = setTimeout(() => {
        setShowOverlay(true)
      }, 1000)
    } else {
      setShowOverlay(false)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoaded])

  const [props, springApi] = useSpring(() => ({
    opacity: 0,
  }))

  useEffect(() => {
    const onPlayHandler = () => {
      springApi.start({
        opacity: 1,
        onChange: (result) => {
          if (parentRef.current) parentRef.current.style.opacity = `${result.value.opacity}`
        },
      })
    }

    const onPauseHandler = () => {
      springApi.start({
        opacity: 0,
        onChange: (result) => {
          if (parentRef.current) parentRef.current.style.opacity = `${result.value.opacity}`
        },
      })
    }

    const unsubPlay = onPlay(onPlayHandler)
    const unsubPause = onPause(onPauseHandler)

    return () => {
      unsubPlay()
      unsubPause()
    }
  }, [onPause, onPlay, springApi])

  useEffect(() => {
    if (!isLoaded) return
    if (!isHome.current) return

    springApi.start({
      opacity: 1,
      onChange: (result) => {
        if (parentRef.current) parentRef.current.style.opacity = `${result.value.opacity}`
      },
    })
  }, [isLoaded, springApi])

  return (
    <>
      <CausticOverlay show={showOverlay} />
      <Canvas
        ref={(node) => {
          if (!node) return
          parentRef.current = node.parentElement!.parentElement! as HTMLDivElement
        }}
        shadows
        dpr={[1, perfSucks ? 1.5 : 2]}
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
        camera={{ position: [20, 0.9, 20], fov: 26 }}
        className="touch-action-none inset-0 opacity-0 will-change-[opacity]"
        style={{
          position: 'fixed',
          width: '100vw',
          pointerEvents: isPaused ? 'none' : 'auto',
        }}
      >
        <SubscribeToFrameloop />
        <Scene perfSucks={perfSucks} />
        {/** PerfMon will detect performance issues */}
        <PerformanceMonitor onDecline={() => degrade(true)} />
      </Canvas>
    </>
  )
}

function SubscribeToFrameloop() {
  const isPaused = useCanvasApi((state) => state.isPaused)
  const state = useThree()
  const onPlay = useCanvasApi((state) => state.onPlay)
  const onPause = useCanvasApi((state) => state.onPause)

  useEffect(() => {
    const onPlayHandler = () => {
      state.internal.active = true
      invalidate()
    }
    const onPauseHandler = () => {
      state.internal.active = false
    }

    const unsubPlay = onPlay(onPlayHandler)
    const unsubPause = onPause(onPauseHandler)

    return () => {
      unsubPlay()
      unsubPause()
    }
  }, [onPause, onPlay, state])

  useEffect(() => {
    state.internal.active = !isPaused
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

type CanvasApi = {
  isPaused: boolean
  isLoaded: boolean
  pause: () => void
  play: () => void
  onPauseCallbacks: (() => void)[]
  onPlayCallbacks: (() => void)[]
  onPause: (callback: () => void) => () => void
  onPlay: (callback: () => void) => () => void
  setIsLoaded: (isLoaded: boolean) => void
}

export const useCanvasApi = create<CanvasApi>((set, get) => ({
  isPaused: true,
  isLoaded: false,
  onPauseCallbacks: [],
  onPlayCallbacks: [],
  onPause: (callback) => {
    set((state) => ({ onPauseCallbacks: [...state.onPauseCallbacks, callback] }))
    return () =>
      set((state) => ({
        onPauseCallbacks: state.onPauseCallbacks.filter((fn) => fn !== callback),
      }))
  },
  onPlay: (callback) => {
    set((state) => ({ onPlayCallbacks: [...state.onPlayCallbacks, callback] }))
    return () =>
      set((state) => ({
        onPlayCallbacks: state.onPlayCallbacks.filter((fn) => fn !== callback),
      }))
  },
  pause: () => {
    set({ isPaused: true })
    const onPause = get().onPauseCallbacks
    onPause.forEach((fn) => fn())
  },
  play: () => {
    set({ isPaused: false })
    const onPlay = get().onPlayCallbacks
    onPlay.forEach((fn) => fn())
  },
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}))
