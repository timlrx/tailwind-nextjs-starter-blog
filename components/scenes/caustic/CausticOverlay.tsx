const charClasses =
  'absolute text-[14vw] font-extrabold leading-[0.8em] text-[#3e3e3d] dark:text-white select-none'

export default function CausticOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 h-[100%] w-[100%] overflow-hidden">
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
      </div>

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

      <div className="fixed inset-0 -z-[1] bg-[#f6d9d9]" />
    </>
  )
}
