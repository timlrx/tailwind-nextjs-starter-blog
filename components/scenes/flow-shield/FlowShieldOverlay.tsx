'use client'

import Logo from '@/data/logo.svg'
import Link from 'next/link'

export default function FlowShieldOverlay({ show = true }: { show?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5]">
      <div
        className="absolute top-24 left-6 max-w-[34rem] md:top-28 md:left-10"
        style={{
          opacity: show ? 1 : 0,
          transform: `translateY(${show ? 0 : 12}px)`,
          transitionProperty: 'opacity, transform',
          transitionDuration: show ? '700ms' : '250ms',
          transitionTimingFunction: show ? 'cubic-bezier(0.2, 0.9, 0.2, 1)' : 'ease-out',
        }}
      >
        <p className="mb-3 text-[11px] font-medium tracking-[0.28em] text-white/55 uppercase">
          New Article
        </p>
        <h1 className="max-w-[16ch] text-4xl leading-tight font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Creating an Interactive Sci-Fi Shield
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-white/70 md:text-base">
          Interactive sci-fi shielding with hit detection, procedural hexes, flowing noise, and
          custom shader work in React Three Fiber.
        </p>
        <p className="mt-3 text-[11px] tracking-[0.15em] text-white/40 uppercase">
          by Christian Oritz
        </p>
        <div className="pointer-events-auto mt-5 flex items-center gap-4">
          <Link
            href="/blog/creating-flow-shield"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Read article
          </Link>
        </div>
      </div>

      <div
        className="fixed bottom-10 left-6 z-[5] text-[18px] select-none md:bottom-[120px] md:left-10"
        style={{
          opacity: show ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: `${show ? 700 : 250}ms`,
          transitionTimingFunction: 'ease-out',
          transitionDelay: '240ms',
        }}
      >
        <div className="flex items-center">
          <Logo className="mr-4 size-8 opacity-70 invert" />
          <div className="text-[13px] leading-tight text-white/85">
            pmndrs
            <br />
            dev collective
          </div>
        </div>
      </div>
    </div>
  )
}
