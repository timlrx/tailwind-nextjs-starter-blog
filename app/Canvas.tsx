'use client'

import { useCanvasApi } from './canvas-state'
import FlowShieldControls from '@/components/scenes/flow-shield/FlowShieldControls'
import FlowShieldOverlay from '@/components/scenes/flow-shield/FlowShieldOverlay'
import FlowShieldScene from '@/components/scenes/flow-shield/FlowShieldScene'
import { useSpring } from '@react-spring/web'
import { PerformanceMonitor } from '@react-three/drei'
import { Canvas, invalidate, useThree } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

THREE.Texture.DEFAULT_ANISOTROPY = 8

const Scene = FlowShieldScene

export default function PmndrsCanvas() {
  const parentRef = useRef<HTMLDivElement>(null!)
  const [perfSucks, degrade] = useState(false)
  const isPaused = useCanvasApi((state) => state.isPaused)
  const onPause = useCanvasApi((state) => state.onPause)
  const onPlay = useCanvasApi((state) => state.onPlay)
  const isLoaded = useCanvasApi((state) => state.isLoaded)
  const pause = useCanvasApi((state) => state.pause)
  const reset = useCanvasApi((state) => state.reset)
  const prevIsLoaded = useRef(isLoaded)

  const pathname = usePathname()
  const isHome = pathname === '/'
  const isHomeRef = useRef(isHome)
  isHomeRef.current = isHome

  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isHome) {
      if (!prevIsLoaded.current && !isLoaded) return

      if (!prevIsLoaded.current && isLoaded) {
        timeout = setTimeout(() => {
          setShowOverlay(true)
        }, 1000)
      }

      if (prevIsLoaded.current && isLoaded) {
        setShowOverlay(true)
      }
    } else {
      setShowOverlay(false)
    }

    prevIsLoaded.current = isLoaded

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoaded, isHome])

  const [props, springApi] = useSpring(() => ({
    opacity: 0,
  }))

  useEffect(() => {
    return () => {
      pause()
      reset()
    }
  }, [pause, reset])

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
    if (!isHomeRef.current) return

    springApi.start({
      opacity: 1,
      onChange: (result) => {
        if (parentRef.current) parentRef.current.style.opacity = `${result.value.opacity}`
      },
    })
  }, [isLoaded, springApi])

  return (
    <>
      <FlowShieldControls show={isHome} />
      <FlowShieldOverlay show={showOverlay} />
      <Canvas
        ref={(node) => {
          if (!node) return
          parentRef.current = node.parentElement!.parentElement! as HTMLDivElement
        }}
        shadows
        dpr={[1, perfSucks ? 1.25 : 1.75]}
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
