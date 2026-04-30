import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { patternConfigs, createPattern, resolvePatternFromParam } from '@/lib/patterns'

// ============================================================================
// SPLASH SCREEN - Organic Geometric Dark Charcoal
// ============================================================================

const bgDark = '#0d0d0d'
const charcoal = {
  bg: '#0d0d0d',
  surface: '#141414',
  surfaceElevated: '#1a1a1a',
  text: '#e8e4df',
  textMuted: '#8a8078',
  textSubtle: '#5c554e',
  warm: '#c4a882',
  warmMuted: '#8a7a68',
  border: 'rgba(200, 180, 155, 0.08)',
  borderHover: 'rgba(200, 180, 155, 0.2)',
}

export default function Index() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPatternKey, setCurrentPatternKey] = useState(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const transitionRef = useRef(false)
  const transitionProgressRef = useRef(0)
  const contentWrapperRef = useRef(null)
  const activeConfigRef = useRef(null)
  const patternRef = useRef(null)
  const patternIndexRef = useRef(0)
  const contentBoundsRef = useRef({ width: 0, height: 0 })

  const getClearRadius = (width, height) => {
    const isMobile = width < 640
    const contentDiameter = Math.max(
      contentBoundsRef.current.width,
      contentBoundsRef.current.height
    )
    const contentRadius = contentDiameter * 0.5
    const padding = contentRadius * (isMobile ? 0.15 : 0.08)
    const targetRadius = contentRadius + padding
    const maxRadius = Math.min(width, height) * 0.38
    return Math.min(targetRadius, maxRadius)
  }

  const handleEnter = () => {
    setIsTransitioning(true)
    transitionRef.current = true
    sessionStorage.setItem('sybil_visited', 'true')
    setTimeout(() => {
      router.push('/home')
    }, 1200)
  }

  const handlePatternChange = (key) => {
    if (key === currentPatternKey) return
    const idx = patternConfigs.findIndex((p) => p.key === key)
    if (idx === -1) return

    patternIndexRef.current = idx
    activeConfigRef.current = patternConfigs[idx]
    setCurrentPatternKey(key)

    const width = window.innerWidth
    const height = window.innerHeight
    patternRef.current = createPattern(
      key,
      width,
      height,
      patternConfigs[idx],
      getClearRadius(width, height)
    )

    const url = new URL(window.location.href)
    url.searchParams.set('pattern', key)
    window.history.replaceState({}, '', url)
  }

  useEffect(() => {
    setIsTransitioning(false)
    setIsLoaded(false)

    const params = new URLSearchParams(window.location.search)
    const timer = setTimeout(() => setIsLoaded(true), 150)

    const canvas = canvasRef.current
    if (!canvas) return () => clearTimeout(timer)

    const ctx = canvas.getContext('2d')
    let canvasScale = 1
    let startTime = performance.now()
    let lastCycleT = 0

    const patternParam = params.get('pattern')
    const initialConfig = resolvePatternFromParam(patternParam)
    activeConfigRef.current = initialConfig
    patternIndexRef.current = patternConfigs.findIndex((p) => p.key === initialConfig.key)
    setCurrentPatternKey(initialConfig.key)

    const resize = () => {
      canvasScale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * canvasScale
      canvas.height = window.innerHeight * canvasScale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(canvasScale, 0, 0, canvasScale, 0, 0)

      const width = window.innerWidth
      const height = window.innerHeight
      patternRef.current = createPattern(
        activeConfigRef.current.key,
        width,
        height,
        activeConfigRef.current,
        getClearRadius(width, height)
      )

      if (contentWrapperRef.current) {
        const rect = contentWrapperRef.current.getBoundingClientRect()
        contentBoundsRef.current = { width: rect.width, height: rect.height }
        patternRef.current = createPattern(
          activeConfigRef.current.key,
          width,
          height,
          activeConfigRef.current,
          getClearRadius(width, height)
        )
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = (currentTime) => {
      const width = canvas.width / canvasScale
      const height = canvas.height / canvasScale
      const centerX = width / 2
      const centerY = height / 2
      const config = activeConfigRef.current
      const clearRadius = getClearRadius(width, height)

      const elapsed = currentTime - startTime
      const cycleT = (elapsed % config.cycleMs) / config.cycleMs

      // Detect cycle reset to switch patterns
      if (lastCycleT > 0.9 && cycleT < 0.1) {
        // Cycle just reset, switch to next pattern
        const nextIndex = (patternIndexRef.current + 1) % patternConfigs.length
        const nextConfig = patternConfigs[nextIndex]
        patternIndexRef.current = nextIndex
        activeConfigRef.current = nextConfig
        setCurrentPatternKey(nextConfig.key)
        patternRef.current = createPattern(nextConfig.key, width, height, nextConfig, clearRadius)
      }
      lastCycleT = cycleT

      // Deep charcoal background
      ctx.fillStyle = bgDark
      ctx.fillRect(0, 0, width, height)

      // Very subtle warm vignette
      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        clearRadius * 0.7,
        centerX,
        centerY,
        Math.max(width, height) * 0.6
      )
      vignette.addColorStop(0, 'rgba(13, 13, 13, 0)')
      vignette.addColorStop(1, 'rgba(8, 8, 8, 0.5)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      // Render active pattern
      if (patternRef.current) {
        patternRef.current.render(ctx, cycleT)
      }

      // Transition
      if (transitionRef.current) {
        transitionProgressRef.current = Math.min(transitionProgressRef.current + 0.012, 1)
      }

      // Center disc - warm charcoal, very subtle
      ctx.save()
      ctx.globalAlpha = 0.92
      ctx.fillStyle = '#111111'
      ctx.beginPath()
      ctx.arc(centerX, centerY, clearRadius, 0, Math.PI * 2)
      ctx.fill()

      // Hairline border ring
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = 'rgba(196, 168, 130, 0.5)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.arc(centerX, centerY, clearRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // Warm fade transition
      if (transitionProgressRef.current > 0) {
        ctx.fillStyle = `rgba(232, 228, 223, ${transitionProgressRef.current})`
        ctx.fillRect(0, 0, width, height)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') handleEnter()
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <canvas ref={canvasRef} className="fixed inset-0" style={{ backgroundColor: bgDark }} />

      <div
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div ref={contentWrapperRef} className="flex flex-col items-center px-6">
          {/* Top label */}
          <p
            className={`mb-4 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ color: charcoal.textSubtle, transitionDelay: '100ms' }}
          >
            Software · AI · Automation
          </p>

          {/* Main title */}
          <h1
            className={`mb-4 text-center text-3xl font-medium tracking-tight transition-all duration-1000 sm:text-4xl md:text-5xl ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{
              color: charcoal.text,
              fontFamily: "'Geist', 'InterVariable', system-ui, sans-serif",
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              transitionDelay: '200ms',
            }}
          >
            Sybil Solutions
          </h1>

          {/* Description */}
          <p
            className={`mb-10 max-w-xs text-center text-sm leading-relaxed transition-all duration-1000 sm:max-w-sm sm:text-base ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{
              color: charcoal.textMuted,
              transitionDelay: '300ms',
              lineHeight: 1.6,
            }}
          >
            Building production systems with AI
          </p>

          {/* Enter button - minimal, warm */}
          <button
            onClick={handleEnter}
            onKeyPress={handleKeyPress}
            className={`group relative cursor-pointer overflow-hidden rounded-sm border px-10 py-3.5 text-xs font-medium uppercase tracking-[0.1em] transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{
              backgroundColor: charcoal.warm,
              borderColor: 'transparent',
              fontFamily: "'Geist Mono', monospace",
              transitionDelay: '400ms',
            }}
          >
            <span className="relative z-10" style={{ color: '#0d0d0d' }}>
              Enter
            </span>
            {/* Hover overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            />
          </button>
        </div>
      </div>

      {/* Pattern switcher - minimal bottom bar */}
      <div
        className={`fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-sm border px-2 py-1.5 backdrop-blur-sm transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
        style={{
          borderColor: charcoal.border,
          backgroundColor: 'rgba(13, 13, 13, 0.6)',
          transitionDelay: '500ms',
        }}
      >
        {patternConfigs.map((pattern, idx) => (
          <button
            key={pattern.key}
            onClick={() => handlePatternChange(pattern.key)}
            className="group relative flex items-center justify-center px-2 py-1 transition-all duration-200"
            title={pattern.name}
            aria-label={`Switch to ${pattern.name}`}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[-0.01em] transition-colors duration-200"
              style={{
                color: currentPatternKey === pattern.key ? charcoal.warm : charcoal.textSubtle,
              }}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            {/* Underline indicator */}
            <span
              className="absolute -bottom-px left-2 right-2 h-px transition-all duration-300 ease-out"
              style={{
                backgroundColor: charcoal.warm,
                width: currentPatternKey === pattern.key ? 'calc(100% - 16px)' : '0%',
                opacity: currentPatternKey === pattern.key ? 1 : 0,
              }}
            />
            {/* Tooltip */}
            <span
              className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm px-2 py-0.5 text-[9px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                backgroundColor: charcoal.surfaceElevated,
                color: charcoal.textMuted,
                border: `1px solid ${charcoal.border}`,
              }}
            >
              {pattern.name}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return page
}
