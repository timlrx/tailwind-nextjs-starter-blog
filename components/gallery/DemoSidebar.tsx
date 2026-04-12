'use client'

import { Demo } from '@/data/demos'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PillButton } from './PillButton'

// The same motion curve used in the examples site
const MOTION_CURVE =
  'linear(0,0.0078,0.034,0.0738,0.116,0.16,0.203,0.244,0.284,0.322,0.357,0.391,0.422,0.453,0.483,0.51,0.536,0.561,0.583,0.606,0.627,0.646,0.665,0.683,0.7,0.716,0.731,0.745,0.759,0.771,0.784,0.795,0.806,0.816,0.826,0.835,0.844,0.852,0.859,0.867,0.874,0.881,0.887,0.893,0.899,0.904,0.909,0.914,0.919,0.923,0.927,0.931,0.935,0.938,0.941,0.944,0.947,0.95,0.953,0.955,0.958,0.96,0.962,0.964,0.966,0.968,0.969,0.971,0.973,0.974,0.975,0.977,0.978,0.979,0.98,0.981,0.982,0.983,0.984,0.985,0.986,0.987,0.987,0.988,0.989,0.989,0.99,0.99,0.991,0.991,0.992,0.992,0.993,0.993,0.993,0.994,0.994,0.994,0.995,0.995,0.995,0.995,0.996,0.996,0.996,0.996,0.997,0.997,0.997,0.997,0.997,0.997,0.998,0.998,0.998,0.998,0.998,0.998,0.998,0.998,0.998,0.998,0.999,0.999,0.999,0.999,0.999,0.999,0.999,0.999,1)'

type Props = {
  demos: Demo[]
  selected: Demo
  collapsed: boolean
  onSelect: (demo: Demo) => void
  onToggle: () => void
}

export function DemoSidebar({ demos, selected, collapsed, onSelect, onToggle }: Props) {
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map())
  const navRef = useRef<HTMLDivElement>(null)
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const [near, setNear] = useState(false)

  // Track actual rendered width (200px mobile / 260px sm+)
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const ro = new ResizeObserver(() => setSidebarWidth(nav.offsetWidth))
    ro.observe(nav)
    setSidebarWidth(nav.offsetWidth)
    return () => ro.disconnect()
  }, [])

  // Scroll selected item into view
  useEffect(() => {
    const el = itemRefs.current.get(selected.name)
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selected.name])

  // Near-edge detection: when collapsed, nudge toggle out if mouse is near left edge
  useEffect(() => {
    if (!collapsed) {
      setNear(false)
      return
    }

    const onMove = (e: MouseEvent) => setNear(e.clientX < 120)
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [collapsed])

  // Keyboard shortcut cmd+[ to toggle
  const handleToggle = useCallback(onToggle, [onToggle])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '[' && e.metaKey) handleToggle()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleToggle])

  return (
    <div
      ref={navRef}
      data-collapsed={collapsed || undefined}
      className="group/sidebar relative z-10 h-dvh w-[200px] shrink-0 overflow-visible sm:w-[260px]"
      style={{
        marginInlineStart: collapsed ? `-${sidebarWidth}px` : '0',
        transition: `margin-inline-start 1078ms ${MOTION_CURVE}`,
      }}
    >
      <div
        className="absolute top-1/2 right-2 z-10"
        style={{
          translate: collapsed ? (near ? '95% -50%' : '45% -50%') : '50% -50%',
          transition: 'translate 0.25s ease',
        }}
      >
        <PillButton
          standalone
          onClick={onToggle}
          aria-label={collapsed ? 'Show demos' : 'Hide demos'}
          className="grid h-[5rem] w-8 place-items-center hover:bg-[#f5f5f5] hover:text-[#222]"
        >
          <span className="flex flex-col items-center gap-1.5">
            <svg
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[0.7rem] w-[0.7rem]"
              style={{
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: `transform 1078ms ${MOTION_CURVE}`,
              }}
            >
              <path
                d="M5 1L1 5L5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-[0.6rem] leading-none tracking-[0.08em] uppercase"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {collapsed ? 'show' : 'hide'}
            </span>
          </span>
        </PillButton>
      </div>

      {/* Scrollable nav list */}
      <nav
        className="no-scrollbar h-full overflow-y-auto overscroll-contain"
        style={{
          opacity: collapsed ? 0 : 1,
          pointerEvents: collapsed ? 'none' : 'auto',
          transition: 'opacity 0.15s linear',
        }}
      >
        <ul className="m-0 flex list-none flex-col gap-3 p-4 pr-3">
          {demos.map((d) => (
            <li
              key={d.name}
              ref={(el) => {
                if (el) itemRefs.current.set(d.name, el)
                else itemRefs.current.delete(d.name)
              }}
              className="active:scale-[0.97]"
              style={{ transition: `transform 1078ms ${MOTION_CURVE}` }}
            >
              <button
                onClick={() => onSelect(d)}
                className="block w-full overflow-hidden rounded-[6px] bg-white text-left outline-2 outline-offset-2 outline-transparent transition-[outline-color,box-shadow] duration-200 hover:shadow-[0_2px_12px_rgb(0_0_0/0.1)]"
                style={{
                  outlineColor: selected.name === d.name ? 'black' : 'transparent',
                  outlineStyle: 'solid',
                }}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  {d.isNew && (
                    <span className="absolute top-1.5 right-1.5 z-[1] rounded-full bg-[#e8756a] px-[7px] py-0.5 text-[0.55rem] leading-[1.5] font-bold tracking-[0.06em] text-white uppercase">
                      New
                    </span>
                  )}
                  <Image
                    src={d.thumb}
                    alt={d.name}
                    fill
                    sizes="(min-width: 640px) 227px, 175px"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
