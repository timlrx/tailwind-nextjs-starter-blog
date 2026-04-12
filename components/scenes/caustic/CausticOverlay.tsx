'use client'

import Logo from '@/data/logo.svg'

const charClasses =
  'absolute text-[14vw] font-extrabold leading-[0.8em] dark:text-white select-none'

const chars = [
  { letter: 'P', styles: { top: 40, left: 40, color: 'rgb(62 61 61 / 80%)' } },
  { letter: 'M', styles: { top: 40, left: '20vw', color: 'rgb(62 61 61 / 70%)' } },
  { letter: 'N', styles: { top: 40, left: '40vw', color: 'rgb(62 61 61 / 60%)' } },
  { letter: 'D', styles: { top: '20vw', left: '20vw', color: 'rgb(62 61 61 / 65%)' } },
  { letter: 'R', styles: { bottom: 40, left: '40vw', color: 'rgb(62 61 61 / 55%)' } },
  { letter: 'S', styles: { bottom: 40, left: '60vw', color: 'rgb(62 61 61 / 50%)' } },
]

export default function CausticOverlay({ show = true }) {
  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-[5] h-[100%] w-[100vw] overflow-hidden">
        {chars.map((char, index) => (
          <div
            key={chars[index].letter}
            style={{
              ...char.styles,
              opacity: show ? 1 : 0,
              transform: `translateX(${show ? 0 : 20}px)`,
              transitionProperty: 'opacity, transform',
              transitionDuration: show ? '700ms' : '250ms',
              transitionTimingFunction: show ? 'cubic-bezier(0.2, 0.9, 0.2, 1)' : 'ease-out',
              transitionDelay: `${index * 60}ms`,
            }}
            className={charClasses}
          >
            {char.letter}
          </div>
        ))}
      </div>

      <div
        className="fixed bottom-[120px] left-[120px] z-[5] text-[18px] select-none"
        style={{
          opacity: show ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: `${show ? 700 : 250}ms`,
          transitionTimingFunction: 'ease-out',
          transitionDelay: `${(chars.length - 2) * 60}ms`,
        }}
      >
        <div className="flex items-center">
          <Logo className="mr-4 size-8 opacity-70 dark:invert" />
          <div className="text-[13px] leading-tight">
            pmndrs
            <br />
            dev collective
          </div>
        </div>
      </div>
    </>
  )
}
