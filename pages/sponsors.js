import { PageSEO } from '@/components/SEO'
import { SlideUp } from '@/lib/transitions/PageTransition'
import Link from '@/components/Link'
import { useEffect, useRef } from 'react'

const sponsors = [
  {
    name: 'Anthropic',
    description: 'Claude Code Warsaw',
    href: 'https://anthropic.com',
  },
  {
    name: 'Factory AI',
    description: 'Droid CLI support',
    href: 'https://factory.ai',
  },
  {
    name: 'Nvidia',
    description: 'Compute for LLM compressions Nemotron, Qwen',
    href: 'https://nvidia.com',
  },
  {
    name: 'TNG Technology',
    description: 'Compute for research on LLM compression',
    href: 'https://tngtech.com',
  },
  {
    name: 'Lambda AI',
    description: 'Compute for GLM-5.1-REAP',
    href: 'https://lambdalabs.com',
  },
  {
    name: 'Prime Intellect',
    description: 'Compute for GLM-4.7-REAP',
    href: 'https://primeintellect.ai',
  },
  {
    name: 'Hot Aisle',
    description: 'Compute for AMD support in vllm-studio',
    href: 'https://hotaisle.com',
  },
]

export default function Sponsors() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let scale = 1

    const resize = () => {
      scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(scale, 0, 0, scale, 0, 0)

      const particleCount = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 20000),
        60
      )
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.2 + 0.05,
      }))
    }

    const animate = () => {
      const width = canvas.width / scale
      const height = canvas.height / scale

      ctx.fillStyle = 'hsl(30, 5%, 10.5%)'
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(40, 20%, 80%, ${p.alpha})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(40, 15%, 70%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <PageSEO
        title="Sponsors - Sero"
        description="Companies supporting our work in AI and open source."
      />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ backgroundColor: 'hsl(30, 5%, 10.5%)' }}
      />

      <section className="section-breathe px-4 sm:px-6">
        <SlideUp>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
              Supported By
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-text-primary sm:mb-6 sm:text-4xl md:text-5xl">
              Sponsors & Partners
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              These companies have supported our work in AI, open source, and developer
              infrastructure. Their partnership enables us to build better tools for everyone.
            </p>
          </div>
        </SlideUp>
      </section>

      <section className="section-breathe px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor, i) => (
              <SlideUp key={sponsor.name} delay={i * 0.05}>
                <Link
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-surface-elevated/50 rounded-xl border border-border-subtle p-5 text-center transition-all hover:border-border-strong hover:bg-surface-elevated sm:p-6">
                    <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                      {sponsor.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">{sponsor.description}</p>
                    <span className="mt-2 block text-xs text-text-muted transition-colors group-hover:text-accent-subtle">
                      Visit →
                    </span>
                  </div>
                </Link>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-breathe px-4 sm:px-6">
        <SlideUp>
          <div className="mx-auto max-w-2xl text-center">
            <div className="bg-surface-elevated/50 rounded-2xl border border-border-subtle p-6 text-center sm:p-8 md:p-12">
              <h2 className="mb-3 text-xl font-semibold text-text-primary sm:mb-4 sm:text-2xl">
                Become a Sponsor
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary sm:mb-6 sm:text-base">
                If you're building tools that make AI more accessible and want to support open
                source development, let's talk.
              </p>
              <Link
                href="/contact"
                className="inline-block w-full rounded-lg bg-text-primary px-6 py-3 text-sm font-medium text-surface-base transition-all hover:opacity-90 sm:w-auto sm:px-8"
              >
                Contact us
              </Link>
            </div>
          </div>
        </SlideUp>
      </section>
    </>
  )
}
