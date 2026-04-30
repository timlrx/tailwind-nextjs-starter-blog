// ============================================================================
// PATTERN: CONCENTRIC RINGS
// Sacred geometry with wave pulses, energy flows, and triangulated depth
// ============================================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)

const palette = {
  ring: 'hsla(40, 20%, 75%, 0.35)',
  ringBright: 'hsla(45, 35%, 88%, 0.7)',
  glow: 'hsla(40, 25%, 88%, 0.2)',
  spoke: 'hsla(40, 20%, 82%, 0.45)',
  node: 'hsla(40, 30%, 92%, 0.85)',
  nodeGlow: 'hsla(40, 25%, 85%, 0.25)',
  warm: 'hsla(35, 40%, 75%, 0.5)',
}

export const config = { key: 'rings', name: 'Concentric Rings', cycleMs: 7500, clearRadius: 0.23 }

export class ConcentricRings {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.cx = width / 2
    this.cy = height / 2
    this.rings = []
    this.radials = []
    this.build()
  }

  build() {
    const maxR = Math.min(this.cx, this.cy) - 25
    const ringCount = 10
    const minR = this.clearRadius * 1.05

    for (let r = 0; r < ringCount; r++) {
      const ringT = r / (ringCount - 1)
      const radius = minR + (maxR - minR) * ringT
      const points = Math.floor(8 + r * 5)
      const rotation = (r % 2) * (Math.PI / points) * 0.5

      const ring = []
      for (let p = 0; p < points; p++) {
        const baseAngle = (p / points) * Math.PI * 2 + rotation
        const wobble = Math.sin(baseAngle * 3 + r * 1.2) * 8
        const angle = baseAngle + Math.sin(radius * 0.015 + r) * 0.2
        ring.push({
          x: this.cx + Math.cos(angle) * (radius + wobble),
          y: this.cy + Math.sin(angle) * (radius + wobble),
          angle,
          radius,
          ringIdx: r,
          pointIdx: p,
          baseAngle,
        })
      }
      this.rings.push(ring)
    }

    for (let r = 0; r < ringCount - 1; r++) {
      const inner = this.rings[r]
      const outer = this.rings[r + 1]
      inner.forEach((ipt, i) => {
        const dists = outer.map((pt, j) => ({
          pt,
          j,
          dist: Math.hypot(pt.x - ipt.x, pt.y - ipt.y),
        }))
        dists.sort((a, b) => a.dist - b.dist)
        this.radials.push({ from: ipt, to: dists[0].pt, ringIdx: r })
        if (dists[1] && dists[1].dist < dists[0].dist * 1.8) {
          this.radials.push({ from: ipt, to: dists[1].pt, ringIdx: r })
        }
      })
    }
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)
    const wave1 = t * Math.PI * 2 * 4
    const wave2 = t * Math.PI * 2 * 6
    const ringCount = this.rings.length

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Background glow
    this.rings.forEach((ring, r) => {
      const ringT = r / ringCount
      if (progress < ringT * 0.7) return
      const glow = Math.sin(wave1 - r * 0.6) * 0.3 + 0.4
      ctx.globalAlpha = alpha * 0.06 * glow
      ctx.strokeStyle = palette.glow
      ctx.lineWidth = 12
      ctx.beginPath()
      ring.forEach((pt, i) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)))
      ctx.closePath()
      ctx.stroke()
    })

    // Radial spokes with energy pulse
    this.radials.forEach((line) => {
      const ringT = line.ringIdx / ringCount
      if (progress < ringT * 0.75) return
      const pulsePos = (wave1 / (Math.PI * 2) + line.from.baseAngle / (Math.PI * 2)) % 1
      const pulseInt = Math.sin(pulsePos * Math.PI * 2) * 0.5 + 0.5

      ctx.globalAlpha = alpha * 0.15 * pulseInt
      ctx.strokeStyle = palette.glow
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(line.from.x, line.from.y)
      ctx.lineTo(line.to.x, line.to.y)
      ctx.stroke()

      ctx.globalAlpha = alpha * (0.3 + pulseInt * 0.35)
      ctx.strokeStyle = palette.spoke
      ctx.lineWidth = 0.8 + pulseInt * 0.5
      ctx.beginPath()
      ctx.moveTo(line.from.x, line.from.y)
      ctx.lineTo(line.to.x, line.to.y)
      ctx.stroke()

      if (pulseInt > 0.7) {
        ctx.globalAlpha = (alpha * 0.4 * (pulseInt - 0.7)) / 0.3
        ctx.strokeStyle = palette.ringBright
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(line.from.x, line.from.y)
        ctx.lineTo(line.to.x, line.to.y)
        ctx.stroke()
      }
    })

    // Ring arcs
    this.rings.forEach((ring, r) => {
      const ringT = r / ringCount
      if (progress < ringT * 0.7) return
      for (let i = 0; i < ring.length; i++) {
        const p1 = ring[i],
          p2 = ring[(i + 1) % ring.length]
        const waveVal =
          Math.sin(wave1 - r * 0.7) * 0.5 + Math.sin(wave2 - r * 1.1 + p1.pointIdx * 0.4) * 0.3
        const intensity = (waveVal + 0.8) / 1.6

        ctx.globalAlpha = alpha * 0.2 * intensity
        ctx.strokeStyle = palette.glow
        ctx.lineWidth = 2 + intensity * 1.5
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()

        ctx.globalAlpha = alpha * (0.4 + intensity * 0.4)
        ctx.strokeStyle = palette.ring
        ctx.lineWidth = 0.6 + intensity * 0.7
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    })

    // Nodes
    this.rings.forEach((ring, r) => {
      const ringT = r / ringCount
      if (progress < ringT * 0.7) return
      ring.forEach((pt, p) => {
        const pulse =
          Math.sin(wave1 - r * 0.5 + p * 0.4) * 0.5 + Math.sin(wave2 - r * 0.8 + p * 0.6) * 0.3
        const intensity = (pulse + 0.8) / 1.6
        const size = 1.5 + intensity * 2.5

        ctx.globalAlpha = alpha * 0.25 * intensity
        ctx.fillStyle = palette.nodeGlow
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, size + 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = alpha * (0.6 + intensity * 0.4)
        ctx.fillStyle = palette.ring
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2)
        ctx.fill()

        if (intensity > 0.75) {
          ctx.globalAlpha = (alpha * 0.7 * (intensity - 0.75)) / 0.25
          ctx.fillStyle = palette.node
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    })

    // Traveling energy particles
    for (let i = 0; i < 8; i++) {
      const pt = (t * 0.8 + i / 8) % 1
      const pr = Math.floor(pt * ringCount * 0.9)
      if (pr < 0 || pr >= ringCount) continue
      const ring = this.rings[pr]
      if (!ring || ring.length === 0) continue
      const pa = (t * 0.03 + (i * Math.PI * 2) / 8) % (Math.PI * 2)
      const nearest = ring.reduce(
        (best, pt) => {
          const diff = Math.abs(pt.angle - pa)
          return diff < best.diff ? { pt, diff } : best
        },
        { diff: Infinity }
      )
      if (nearest.pt) {
        ctx.globalAlpha = alpha * 0.6 * envelope(pt)
        ctx.fillStyle = palette.warm
        ctx.beginPath()
        ctx.arc(nearest.pt.x, nearest.pt.y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.restore()
  }
}
