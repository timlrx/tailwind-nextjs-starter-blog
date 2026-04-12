'use client'

import { useEffect, useRef, useState } from 'react'
import { Demo } from '@/data/demos'

type FrameState = { width: number; height: number; scale: number }

export function DemoStage({ demo }: { demo: Demo | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState<FrameState>({ width: 1, height: 1, scale: 1 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId = 0
    const schedule = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const rect = container.getBoundingClientRect()
        const width = window.innerWidth
        const height = window.innerHeight
        const scale = Math.min(rect.width / width, rect.height / height, 1)
        setFrame({ width, height, scale })
      })
    }

    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(container)
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-full min-h-0 w-full min-w-0">
      {demo ? (
        <iframe
          key={demo.embedUrl}
          src={demo.embedUrl}
          title={demo.name}
          className="absolute rounded-2xl border-none bg-white shadow-[0_24px_60px_rgb(0_0_0/0.16)] transition-shadow duration-200"
          style={{
            inset: '50% auto auto 50%',
            width: `${frame.width}px`,
            height: `${frame.height}px`,
            transform: `translate(-50%, -50%) scale(${frame.scale})`,
          }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-[#999]">
          Select a demo
        </div>
      )}
    </div>
  )
}
