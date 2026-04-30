import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import NewsletterForm from '@/components/NewsletterForm'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import FeaturedProjects from '@/components/FeaturedProjects'
import ContributorScroll from '@/components/ContributorScroll'
import { useEffect, useRef } from 'react'
import { SlideUp } from '@/lib/transitions/PageTransition'
import { createPattern, getPatternConfig, patternConfigs } from '@/lib/patterns'

const PortalSeparator = ({ patternKey = 'rings' }) => {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext('2d')
    const activeConfig = getPatternConfig(patternKey) || patternConfigs[0]
    // Responsive sizing for mobile
    const isMobile = wrapper.clientWidth < 640
    const patternOverrides = {
      rings: {},
      circuit: {},
      hexagons: {},
      cracks: {},
      waves: {},
      life: {},
    }
    const patternConfig = { ...activeConfig, ...patternOverrides[patternKey] }
    let animationId = null
    let pattern = null
    let startTime = performance.now()
    let scale = 1

    const resize = () => {
      const width = Math.max(wrapper.clientWidth, 1)
      const height = Math.max(wrapper.clientHeight, 180)
      scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * scale
      canvas.height = height * scale
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(scale, 0, 0, scale, 0, 0)

      const clearRadius = Math.min(width, height) * patternConfig.clearRadius
      pattern = createPattern(patternConfig.key, width, height, patternConfig, clearRadius)
    }

    const animate = (time) => {
      const width = canvas.width / scale
      const height = canvas.height / scale
      const elapsed = time - startTime
      const cycleT = (elapsed % patternConfig.cycleMs) / patternConfig.cycleMs

      ctx.clearRect(0, 0, width, height)
      if (pattern) {
        pattern.render(ctx, cycleT)
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
  }, [patternKey])

  return (
    <div ref={wrapperRef} className="relative my-12 min-h-[180px] overflow-hidden rounded-2xl">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts: posts.slice(0, 3) } }
}

export default function Home({ posts }) {
  useEffect(() => {
    // Mark as visited for portal skip
    sessionStorage.setItem('sybil_visited', 'true')
  }, [])

  const recentWork = [
    {
      type: 'Open Source',
      project: 'TurboQuant',
      detail: 'KV cache quantization for LLM inference',
    },
    {
      type: 'Open Source',
      project: 'vLLM Studio',
      detail: 'Control panel for local inference',
    },
    {
      type: 'Open Source',
      project: 'Parchi',
      detail: 'AI friend in your browser',
    },
    {
      type: 'Open Source',
      project: 'Pi Brain',
      detail: 'Local AI memory system',
    },
  ]

  const stats = [
    { value: '60k+', label: 'Total Stars' },
    { value: '200+', label: 'Public Repositories' },
    { value: '5k+', label: 'Stars Contributed' },
  ]

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      {/* Hero Section */}
      <section className="section-breathe relative overflow-hidden">
        <div className="relative z-10">
          <SlideUp className="text-left">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-text-muted">
              0xSero
            </p>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Building the future of AI
            </h1>
            <p className="mb-8 max-w-xl text-lg text-text-secondary md:text-xl">
              I work to make AI more accessible, affordable, and useful for everyone. From
              compressing LLMs to fit on edge devices, to educating people on the technology and
              what can be done with it.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <Link
                href="/contact"
                className="w-full rounded-lg bg-text-primary px-8 py-3 text-center text-sm font-medium text-surface-base transition-all hover:opacity-90 sm:w-auto"
              >
                Contact me
              </Link>
              <Link
                href="/case-studies"
                className="w-full rounded-lg border border-border-strong px-8 py-3 text-center text-sm font-medium text-text-primary transition-all hover:bg-surface-elevated sm:w-auto"
              >
                View case studies
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Current Focus - Full Width Row */}
      <section className="section-breathe pt-0">
        <SlideUp>
          <div className="divider-asymmetric surface-float hover-glow hover-lift bg-surface-elevated/70 rounded-xl border border-border-subtle p-6 backdrop-blur">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
              Current Focus
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-text-primary">LLM Compression</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Expert pruning, quantization, and model optimization for edge deployment
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">AI Education</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Making AI accessible through tools, documentation, and community building
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Open Source</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Building and contributing to open-source tools used by developers worldwide
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-text-muted">
              <Link href="https://github.com/0xSero" className="hover:text-text-secondary">
                GitHub
              </Link>
              <span className="h-1 w-1 self-center rounded-full bg-border-subtle" />
              <Link href="https://x.com/0xsero" className="hover:text-text-secondary">
                X/Twitter
              </Link>
              <span className="h-1 w-1 self-center rounded-full bg-border-subtle" />
              <Link href="https://warpcast.com/sero" className="hover:text-text-secondary">
                Farcaster
              </Link>
            </div>
          </div>
        </SlideUp>
      </section>

      {/* Stats Bar */}
      <section className="section-breathe pt-0">
        <SlideUp>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-accent-subtle md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </SlideUp>
      </section>

      <section className="section-breathe pt-0">
        <SlideUp>
          <PortalSeparator patternKey="rings" />
        </SlideUp>
      </section>

      {/* Featured Open Source */}
      <section className="section-breathe">
        <SlideUp>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
                Open Source Work
              </h2>
              <p className="mt-2 text-text-secondary">Tools and libraries built in public.</p>
            </div>
            <Link
              href="https://github.com/0xSero"
              className="hidden text-sm text-accent-subtle transition-colors hover:text-text-primary sm:block"
            >
              View all on GitHub &rarr;
            </Link>
          </div>
        </SlideUp>
        <SlideUp delay={0.1}>
          <FeaturedProjects />
        </SlideUp>
        <Link
          href="https://github.com/0xSero"
          className="mt-4 block text-center text-sm text-accent-subtle transition-colors hover:text-text-primary sm:hidden"
        >
          View all on GitHub &rarr;
        </Link>
      </section>

      <section className="section-breathe pt-0">
        <SlideUp>
          <PortalSeparator patternKey="circuit" />
        </SlideUp>
      </section>

      {/* Capability Strip */}
      <section className="section-breathe pt-0">
        <SlideUp>
          <div className="divider-asymmetric surface-float hover-glow hover-lift bg-surface-elevated/70 flex flex-col gap-6 rounded-xl border border-border-subtle p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.25em] text-text-muted">
                SELECTED CAPABILITIES
              </h2>
              <p className="mt-3 max-w-xl text-sm text-text-secondary">
                I take on complex projects at the edge of what's possible and make them boringly
                reliable.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-text-secondary sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                  AI / AGENTS
                </p>
                <p className="mt-1">
                  LLM infrastructure, multi-agent orchestration, tool-calling systems
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                  DEV TOOLS
                </p>
                <p className="mt-1">
                  Open-source libraries, browser automation, data extraction tooling
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                  PRODUCT / SYSTEMS
                </p>
                <p className="mt-1">Interfaces that match the depth of the underlying system</p>
              </div>
            </div>
          </div>
        </SlideUp>
      </section>

      {/* Recent Work Section */}
      <section className="section-breathe">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">Recent Work</h2>
            <p className="mt-2 text-text-secondary">What I've been building lately</p>
          </div>
          <Link
            href="/case-studies"
            className="hidden text-sm text-accent-subtle transition-colors hover:text-text-primary sm:block"
          >
            All case studies &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentWork.map((item, i) => (
            <SlideUp key={item.project} delay={i * 0.06}>
              <div className="bg-surface-elevated/50 flex h-full flex-col rounded-xl border border-border-subtle p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-accent-subtle">
                  {item.type}
                </span>
                <h3 className="mt-2 font-medium text-text-primary">{item.project}</h3>
                <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
              </div>
            </SlideUp>
          ))}
        </div>
        <Link
          href="/case-studies"
          className="mt-4 block text-center text-sm text-accent-subtle transition-colors hover:text-text-primary sm:hidden"
        >
          All case studies &rarr;
        </Link>
      </section>

      <section className="section-breathe pt-0">
        <SlideUp>
          <PortalSeparator patternKey="cracks" />
        </SlideUp>
      </section>

      {/* Contributor Scroll */}
      <section className="section-breathe">
        <SlideUp>
          <ContributorScroll />
        </SlideUp>
      </section>

      {/* Testimonials Section */}
      <section className="section-breathe">
        <SlideUp>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-text-primary md:text-4xl">
              Testimonials
            </h2>
          </div>
        </SlideUp>
        <SlideUp delay={0.05}>
          <TestimonialsCarousel />
        </SlideUp>
      </section>

      {/* Recent Blog Posts */}
      {posts.length > 0 && (
        <section className="section-breathe">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
              Latest Insights
            </h2>
            <Link
              href="/blog"
              className="text-accent-subtle transition-colors hover:text-text-primary"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {posts.map((post, i) => (
              <SlideUp key={post.slug} delay={i * 0.1}>
                <article className="group divider-asymmetric relative pb-8">
                  <time className="text-sm text-text-muted">{post.date}</time>
                  <h3 className="mt-2 text-xl font-semibold text-text-primary transition-colors group-hover:text-accent-subtle">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="line-clamp-2 mt-2 text-text-secondary">{post.summary}</p>
                </article>
              </SlideUp>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      {siteMetadata.newsletter.provider !== '' && (
        <section className="section-breathe">
          <div className="divider-asymmetric relative p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-semibold text-text-primary">Stay Updated</h2>
            <p className="mx-auto mb-8 max-w-xl text-text-secondary">
              Subscribe for insights on AI systems, developer tools, and building in public.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
