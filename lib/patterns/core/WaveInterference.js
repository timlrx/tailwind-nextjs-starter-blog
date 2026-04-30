// ============================================================================
// PATTERN: WAVE INTERFERENCE
// Multiple wave sources creating interference patterns with concentric ripples
// ============================================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)

const palette = {
  ripple: 'hsla(40, 20%, 75%, 0.35)',
  rippleBright: 'hsla(40, 30%, 92%, 0.8)',
  glow: 'hsla(40, 25%, 88%, 0.15)',
  peak: 'hsla(40, 30%, 95%, 0.9)',
  trough: 'hsla(35, 20%, 60%, 0.3)',
  grid: 'hsla(35, 15%, 50%, 0.12)',
}

export const config = { key: 'waves', name: 'Wave Interference', cycleMs: 8000, clearRadius: 0.24 }

export class WaveInterference {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.cx = width / 2
    this.cy = height / 2
    this.sources = []
    this.points = []
    this.build()
  }

  build() {
    const maxR = Math.min(this.cx, this.cy) - 15
    const sourceCount = 5
    const ringsPerSource = 8

    for (let s = 0; s < sourceCount; s++) {
      const angle = (s / sourceCount) * Math.PI * 2 + Math.PI / sourceCount
      const dist = this.clearRadius * 0.8
      const sx = this.cx + Math.cos(angle) * dist
      const sy = this.cy + Math.sin(angle) * dist

      const ripples = []
      for (let r = 0; r < ringsPerSource; r++) {
        const rt = (r + 1) / ringsPerSource
        ripples.push({
          baseRadius: 20 + rt * (maxR - this.clearRadius) * 0.9,
          phase: r * 0.7 + s * 0.3,
          amplitude: 1 - rt * 0.3,
          lineWidth: 1 + (1 - rt) * 1.5,
        })
      }
      this.sources.push({ x: sx, y: sy, angle, ripples })
    }

    const res = 40
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const x = (i / (res - 1)) * this.width
        const y = (j / (res - 1)) * this.height
        const d = Math.hypot(x - this.cx, y - this.cy)
        if (d < this.clearRadius * 1.1 || d > maxR * 0.95) continue
        this.points.push({ x, y, dist: d, phase: Math.random() * Math.PI * 2 })
      }
    }
  }

  waveHeight(x, y, t) {
    let total = 0
    this.sources.forEach((source) => {
      const dx = x - source.x
      const dy = y - source.y
      const dist = Math.hypot(dx, dy)
      const wavelength = 60
      const phase = dist / wavelength - t * Math.PI * 4
      const amp = Math.exp(-dist / 200) * 0.8
      total += Math.sin(phase) * amp
    })
    return total
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)
    const waveReveal = alpha * this.smoothstep(0, 0.15, progress)
    const fieldReveal = alpha * this.smoothstep(0.05, 0.3, progress)

    ctx.save()

    // Wave rings from each source
    this.sources.forEach((source, i) => {
      const sourceReveal = waveReveal * clamp(progress * 1.5 - i * 0.1, 0, 1)
      if (sourceReveal < 0.01) return

      source.ripples.forEach((ripple) => {
        const expansion = 1 + Math.sin(t * Math.PI * 2 + ripple.phase) * 0.08
        const radius = ripple.baseRadius * expansion
        const interference = this.waveHeight(
          source.x + Math.cos(source.angle) * radius,
          source.y + Math.sin(source.angle) * radius,
          t
        )
        const alphaMod = 0.5 + interference * 0.4

        ctx.globalAlpha = sourceReveal * alphaMod * ripple.amplitude * 1.2
        ctx.strokeStyle = palette.ripple
        ctx.lineWidth = ripple.lineWidth * 2
        ctx.beginPath()
        const startAngle = source.angle - Math.PI * 0.4
        const endAngle = source.angle + Math.PI * 0.4
        ctx.arc(source.x, source.y, radius, startAngle, endAngle)
        ctx.stroke()

        if (interference > 0.2) {
          ctx.globalAlpha = sourceReveal * (interference - 0.2) * 2
          ctx.strokeStyle = palette.rippleBright
          ctx.lineWidth = ripple.lineWidth * 1.5
          ctx.stroke()
        }
      })
    })

    // Interference field points
    if (fieldReveal > 0.05) {
      this.points.forEach((point) => {
        const height = this.waveHeight(point.x, point.y, t)
        if (Math.abs(height) < 0.3) return
        const size = 1 + Math.abs(height) * 2
        const a = fieldReveal * Math.abs(height) * 0.5

        ctx.globalAlpha = a
        ctx.fillStyle = height > 0 ? palette.peak : palette.trough
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Connecting nodes
    ctx.globalAlpha = alpha * this.smoothstep(0.1, 0.5, progress) * 0.25
    ctx.strokeStyle = palette.grid
    ctx.lineWidth = 0.8
    const nodes = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.5
      const radius = this.clearRadius * 1.5 + Math.sin(t * Math.PI * 3 + i) * 20
      nodes.push({
        x: this.cx + Math.cos(angle) * radius,
        y: this.cy + Math.sin(angle) * radius,
      })
    }
    ctx.beginPath()
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i]
      const n2 = nodes[(i + 1) % nodes.length]
      ctx.moveTo(n1.x, n1.y)
      ctx.lineTo(n2.x, n2.y)
    }
    ctx.stroke()

    ctx.restore()
  }

  smoothstep(edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
    return t * t * (3 - 2 * t)
  }
}
