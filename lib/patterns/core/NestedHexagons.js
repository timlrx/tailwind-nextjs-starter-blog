// ============================================================================
// PATTERN: NESTED HEXAGONS
// Breathing hexagonal rings with vertex nodes and wave distortion
// ============================================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)

const palette = {
  edge: 'hsla(40, 20%, 75%, 0.4)',
  edgeBright: 'hsla(45, 35%, 88%, 0.75)',
  glow: 'hsla(40, 25%, 88%, 0.18)',
  vertex: 'hsla(40, 30%, 92%, 0.8)',
  vertexGlow: 'hsla(40, 25%, 85%, 0.3)',
}

export const config = { key: 'hexagons', name: 'Nested Hexagons', cycleMs: 8000, clearRadius: 0.22 }

export class NestedHexagons {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.cx = width / 2
    this.cy = height / 2
    this.hexagons = []
    this.build()
  }

  build() {
    const maxR = Math.min(this.cx, this.cy) - 25
    const minR = this.clearRadius * 1.15
    const count = 8

    for (let h = 0; h < count; h++) {
      const t = h / (count - 1)
      const radius = minR + (maxR - minR) * t
      const vertices = []
      for (let v = 0; v < 6; v++) {
        const angle = (v / 6) * Math.PI * 2 + Math.PI / 6
        vertices.push({ baseAngle: angle, radius, hexT: t, vi: v })
      }
      this.hexagons.push({ hexIdx: h, hexT: t, baseRadius: radius, vertices, phase: h * 0.12 })
    }
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)
    const slowWave = t * Math.PI * 2 * 0.4
    const slowRot = t * Math.PI * 2 * 0.08

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    this.hexagons.forEach((hex) => {
      const hexT = hex.hexT
      const hexProgress = clamp((progress - hexT * 0.1) * 2.5, 0, 1)
      if (hexProgress < 0.01) return

      const breathe = envelope((t + hexT * 0.15) % 1)
      const breathing = 1 + breathe * 0.08
      const currentR = hex.baseRadius * breathing
      const rotation = slowRot + hexT * Math.PI * 0.25
      const pulse = envelope((t + hexT * 0.2) % 1)

      // Draw edges
      for (let i = 0; i < 6; i++) {
        const v1 = hex.vertices[i]
        const v2 = hex.vertices[(i + 1) % 6]
        const a1 = v1.baseAngle + rotation
        const a2 = v2.baseAngle + rotation
        const x1 = this.cx + Math.cos(a1) * currentR
        const y1 = this.cy + Math.sin(a1) * currentR
        const x2 = this.cx + Math.cos(a2) * currentR
        const y2 = this.cy + Math.sin(a2) * currentR

        const edgeT = i / 6
        const edgeReveal = clamp(hexProgress - edgeT * 0.12, 0, 1)
        if (edgeReveal < 0.01) continue

        const waveVal = envelope((t * 0.5 + v1.baseAngle * 0.3 + hexT * 0.5) % 1)
        const intensity = waveVal * pulse

        ctx.globalAlpha = alpha * 0.25 * intensity * edgeReveal
        ctx.strokeStyle = palette.glow
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        ctx.globalAlpha = alpha * (0.6 + intensity * 0.3) * edgeReveal
        ctx.strokeStyle = palette.edge
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        if (intensity > 0.5) {
          ctx.globalAlpha = ((alpha * 0.7 * (intensity - 0.5)) / 0.5) * edgeReveal
          ctx.strokeStyle = palette.edgeBright
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }

      // Vertices
      const vertexSize = 1.5 + pulse * 2
      hex.vertices.forEach((v, vi) => {
        const vAngle = v.baseAngle + rotation
        const vReveal = clamp(hexProgress - (vi / 6) * 0.1, 0, 1)
        if (vReveal < 0.01) return

        const x = this.cx + Math.cos(vAngle) * currentR
        const y = this.cy + Math.sin(vAngle) * currentR
        const vPulse = envelope((t * 0.6 + vi * 0.15 + hexT * 0.3) % 1)
        const vIntensity = pulse * vPulse
        const vSize = vertexSize + vIntensity * 1.5

        ctx.globalAlpha = alpha * 0.2 * vIntensity * vReveal
        ctx.fillStyle = palette.vertexGlow
        ctx.beginPath()
        ctx.arc(x, y, vSize + 1.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = alpha * (0.55 + vIntensity * 0.3) * vReveal
        ctx.fillStyle = palette.edge
        ctx.beginPath()
        ctx.arc(x, y, vSize, 0, Math.PI * 2)
        ctx.fill()

        if (vIntensity > 0.65) {
          ctx.globalAlpha = ((alpha * 0.55 * (vIntensity - 0.65)) / 0.35) * vReveal
          ctx.fillStyle = palette.vertex
          ctx.beginPath()
          ctx.arc(x - vSize * 0.2, y - vSize * 0.2, vSize * 0.3, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    })

    ctx.restore()
  }
}
