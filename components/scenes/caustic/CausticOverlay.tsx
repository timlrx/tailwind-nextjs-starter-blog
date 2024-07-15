import { a, useTrail } from '@react-spring/web'

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

      {/* {transitions(
        (style, item) =>
          item && (
            <a.div
              style={style}
              className="pointer-events-none fixed left-0 top-0 z-[5] h-[100%] w-[100vw] overflow-hidden"
            >
              <div className={charClasses} style={{ top: 40, left: 40 }}>
                P
              </div>
              <div className={charClasses} style={{ top: 40, left: '20vw' }}>
                M
              </div>
              <div className={charClasses} style={{ top: 40, left: '40vw' }}>
                N
              </div>
              <div className={charClasses} style={{ top: '20vw', left: '20vw' }}>
                D
              </div>
              <div className={charClasses} style={{ bottom: 40, left: '40vw' }}>
                R
              </div>
              <div className={charClasses} style={{ bottom: 40, left: '60vw' }}>
                S
              </div>
            </a.div>
          )
      )} */}

      {/* <div style={{ position: 'absolute', bottom: 120, left: 120, fontSize: '18px' }}>
        Runtime caustics and soft shadows,
        <br />
        for more realism on the web.
        <br />
        <br />
        <div style={{ position: 'relative', marginTop: 10, display: 'inline-block' }}>
          <a
            style={{ fontSize: '15px', fontWeight: 600, letterSpacing: 2 }}
            href="https://github.com/pmndrs/drei#caustics"
          >
            DOCUMENTATION
          </a>
          <div style={{ marginTop: 6, height: 2.5, width: '100%', background: '#3e3e3d' }} />
        </div>
        <br />
      </div> */}
    </>
  )
}
