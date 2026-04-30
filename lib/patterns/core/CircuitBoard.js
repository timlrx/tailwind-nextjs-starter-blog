// ============================================================================
// PATTERN: CIRCUIT BOARD
// PCB-inspired traces with traveling data pulses, vias, and component pads
// ============================================================================

const TAU = Math.PI * 2
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

const palette = {
  trace: 'hsla(35, 12%, 55%, 0.35)',
  traceBright: 'hsla(40, 20%, 82%, 0.65)',
  traceGlow: 'hsla(40, 25%, 88%, 0.12)',
  node: 'hsla(38, 28%, 75%, 0.7)',
  nodeGlow: 'hsla(40, 25%, 88%, 0.2)',
  pulse: 'hsla(42, 32%, 80%, 0.9)',
  grid: 'hsla(35, 10%, 40%, 0.08)',
}

export const config = { key: 'circuit', name: 'Circuit Board', cycleMs: 8000, clearRadius: 0.22 }

export class CircuitBoard {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.cx = width / 2
    this.cy = height / 2
    this.nodes = []
    this.traces = []
    this.build()
  }

  build() {
    const maxR = Math.min(this.cx, this.cy) - 20
    const minR = this.clearRadius * 1.15
    const rings = 4

    for (let r = 0; r < rings; r++) {
      const ringT = (r + 1) / (rings + 1)
      const ringR = minR + (maxR - minR) * ringT
      const count = 5 + r * 3

      for (let n = 0; n < count; n++) {
        const angle = (n / count) * TAU + (r % 2) * (TAU / count / 2)
        const jitterR = ringR + (Math.random() - 0.5) * ringR * 0.12
        const x = this.cx + Math.cos(angle) * jitterR
        const y = this.cy + Math.sin(angle) * jitterR
        this.nodes.push({
          x,
          y,
          size: 2.5 + Math.random() * 2,
          isVia: Math.random() < 0.25,
          phase: Math.random() * TAU,
        })
      }
    }

    const connected = new Set()
    this.nodes.forEach((node, ni) => {
      const distances = this.nodes
        .map((other, oi) => ({ other, oi, dist: Math.hypot(other.x - node.x, other.y - node.y) }))
        .filter((d) => d.oi !== ni && !connected.has(`${Math.min(ni, d.oi)}-${Math.max(ni, d.oi)}`))
        .sort((a, b) => a.dist - b.dist)

      let made = 0
      for (const d of distances) {
        if (made >= 2) break
        if (d.dist > maxR * 0.45) continue
        const path = this.buildPath(node, d.other)
        if (path.length > 1) {
          this.traces.push({
            from: node,
            to: d.other,
            path,
            phase: ni * 0.17 + d.oi * 0.09,
            speed: 0.6 + Math.random() * 0.4,
          })
          connected.add(`${Math.min(ni, d.oi)}-${Math.max(ni, d.oi)}`)
          made++
        }
      }
    })
  }

  buildPath(from, to) {
    const path = [{ x: from.x, y: from.y }]
    const dx = to.x - from.x
    const dy = to.y - from.y
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return path

    const horizFirst = Math.abs(dx) > Math.abs(dy)
    if (horizFirst) {
      const midX = from.x + dx * (0.4 + Math.random() * 0.2)
      path.push({ x: midX, y: from.y })
      if (Math.random() > 0.5 && Math.abs(dy) > 30) {
        const d = Math.min(Math.abs(dy) * 0.3, 40)
        path.push({ x: midX + (dx > 0 ? d : -d), y: from.y + (dy > 0 ? d : -d) })
      }
    } else {
      const midY = from.y + dy * (0.4 + Math.random() * 0.2)
      path.push({ x: from.x, y: midY })
      if (Math.random() > 0.5 && Math.abs(dx) > 30) {
        const d = Math.min(Math.abs(dx) * 0.3, 40)
        path.push({ x: from.x + (dx > 0 ? d : -d), y: midY + (dy > 0 ? d : -d) })
      }
    }
    path.push({ x: to.x, y: to.y })
    return path
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)
    const pulseT = t * Math.PI * 2

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Ground plane grid
    const gridSize = 50
    ctx.globalAlpha = alpha * 0.08
    ctx.strokeStyle = palette.grid
    ctx.lineWidth = 0.5
    for (let gx = gridSize; gx < this.width; gx += gridSize) {
      if (Math.abs(gx - this.cx) < this.clearRadius * 0.8) continue
      ctx.beginPath()
      ctx.moveTo(gx, 0)
      ctx.lineTo(gx, this.height)
      ctx.stroke()
    }
    for (let gy = gridSize; gy < this.height; gy += gridSize) {
      if (Math.abs(gy - this.cy) < this.clearRadius * 0.8) continue
      ctx.beginPath()
      ctx.moveTo(0, gy)
      ctx.lineTo(this.width, gy)
      ctx.stroke()
    }

    // Traces
    this.traces.forEach((trace) => {
      const reveal = smoothstep(0, 0.3, progress)
      if (reveal < 0.01) return
      const { path, phase, speed } = trace

      for (let i = 0; i < path.length - 1; i++) {
        const p1 = path[i],
          p2 = path[i + 1]
        const segT = i / (path.length - 1)
        const segReveal = clamp(reveal - segT * 0.2, 0, 1)
        if (segReveal < 0.01) continue

        ctx.globalAlpha = alpha * 0.15 * segReveal
        ctx.strokeStyle = palette.traceGlow
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()

        ctx.globalAlpha = alpha * (0.55 + segT * 0.2) * segReveal
        ctx.strokeStyle = palette.trace
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()

        ctx.globalAlpha = alpha * 0.35 * segReveal
        ctx.strokeStyle = palette.traceBright
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }

      // Data pulse
      const pulsePos = ((t * speed + phase) % 1) * (path.length - 1)
      const pulseIdx = Math.floor(pulsePos)
      const pulseFrac = pulsePos - pulseIdx
      if (pulseIdx >= 0 && pulseIdx < path.length - 1) {
        const p1 = path[pulseIdx],
          p2 = path[pulseIdx + 1]
        const px = p1.x + (p2.x - p1.x) * pulseFrac
        const py = p1.y + (p2.y - p1.y) * pulseFrac

        ctx.globalAlpha = alpha * 0.5 * reveal
        ctx.fillStyle = palette.traceGlow
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, TAU)
        ctx.fill()

        ctx.globalAlpha = alpha * 0.9 * reveal
        ctx.fillStyle = palette.pulse
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, TAU)
        ctx.fill()
      }
    })

    // Nodes
    this.nodes.forEach((node) => {
      const dist = Math.hypot(node.x - this.cx, node.y - this.cy)
      const normDist = dist / Math.min(this.cx, this.cy)
      const nodeReveal = smoothstep(0, 0.4, progress)
      if (nodeReveal < 0.01) return

      const nodePulse = Math.sin(pulseT + node.phase) * 0.5 + 0.5
      const size = node.size * (0.9 + nodePulse * 0.2)

      if (node.isVia) {
        ctx.globalAlpha = alpha * 0.2 * nodeReveal
        ctx.fillStyle = palette.nodeGlow
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 2.5, 0, TAU)
        ctx.fill()

        ctx.globalAlpha = alpha * (0.5 + nodePulse * 0.2) * nodeReveal
        ctx.strokeStyle = palette.node
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 1.3, 0, TAU)
        ctx.stroke()

        ctx.globalAlpha = alpha * (0.35 + nodePulse * 0.15) * nodeReveal
        ctx.fillStyle = palette.node
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 0.7, 0, TAU)
        ctx.fill()
      } else {
        ctx.globalAlpha = alpha * 0.2 * nodeReveal
        ctx.fillStyle = palette.nodeGlow
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 2, 0, TAU)
        ctx.fill()

        ctx.globalAlpha = alpha * (0.6 + nodePulse * 0.25) * nodeReveal
        ctx.fillStyle = palette.trace
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, TAU)
        ctx.fill()

        if (nodePulse > 0.7) {
          ctx.globalAlpha = ((alpha * 0.5 * (nodePulse - 0.7)) / 0.3) * nodeReveal
          ctx.fillStyle = palette.traceBright
          ctx.beginPath()
          ctx.arc(node.x - size * 0.25, node.y - size * 0.25, size * 0.35, 0, TAU)
          ctx.fill()
        }
      }
    })

    ctx.restore()
  }
}
