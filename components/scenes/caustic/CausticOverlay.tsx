import { a, useTrail } from '@react-spring/web'
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
  const trails = useTrail(chars.length, {
    x: show ? 0 : 20,
    from: { x: 20 },
    config: { mass: show ? 2 : 1, tension: 500, friction: 36 },
  })

  const trails2 = useTrail(chars.length, {
    opacity: show ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 200, friction: 24, duration: show ? undefined : 100 },
  })

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[5] h-[100%] w-[100vw] overflow-hidden">
        {trails.map((props, index) => (
          <a.div
            key={chars[index].letter}
            style={{ ...props, opacity: trails2[index].opacity, ...chars[index].styles }}
            className={charClasses}
          >
            {chars[index].letter}
          </a.div>
        ))}
      </div>

      <a.div
        className="fixed bottom-[120px] left-[120px] z-[5] text-[18px]"
        style={{ opacity: trails2[trails.length - 2].opacity }}
      >
        <div className="flex items-center">
          <Logo className="mr-4 size-8 opacity-70 dark:invert" />
          <a href="https://pmnd.rs/" className="text-[13px] leading-tight">
            pmndrs
            <br />
            dev collective
          </a>
        </div>
      </a.div>
    </>
  )
}
