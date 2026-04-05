// ============================================================================
// PATTERN: CIRCUIT BOARD
// PCB-inspired circuit trace patterns with nodes, vias, and data pulses
// traveling along paths. Technical, precise aesthetic in warm ink tones.
// ============================================================================

const TAU = Math.PI * 2
const clamp = (v, min, max) => Math.min(Math.max(v, min, max))
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

const palette = {
  base: 'hsl(30, 5%, 10.5%)',
  ink: 'hsla(40, 20%, 88%, 0.55)',
  inkLight: 'hsla(40, 22%, 82%, 0.35)',
  inkSoft: 'hsla(35, 18%, 70%, 0.3)',
  inkFaint: 'hsla(35, 12%, 55%, 0.15)',
  glow: 'hsla(40, 25%, 88%, 0.12)',
  highlight: 'hsla(45, 35%, 85%, 0.5)',
  highlightBright: 'hsla(45, 40%, 92%, 0.7)',
  via: 'hsla(38, 28%, 75%, 0.5)',
  dataPulse: 'hsla(42, 32%, 80%, 0.7)',
}

export const config = {
  key: 'circuit',
  name: 'Circuit Board',
  cycleMs: 7500,
  clearRadius: 0.22,
  nodeCount: 28,
  tracesPerNode: 3,
}

export class CircuitBoard {
  constructor(width, height, clearRadius, options = {}) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.centerX = width / 2
    this.centerY = height / 2
    this.config = { ...config, ...options }
    this.nodes = []
    this.traces = []
    this.vias = []
    this.build()
  }

  build() {
    const { nodeCount, tracesPerNode } = this.config
    const cx = this.centerX
    const cy = this.centerY
    const maxR = Math.min(cx, cy) - 25
    const minR = this.clearRadius * 1.15

    // Generate nodes in a structured grid-like but organic layout
    // Use polar coordinates with jitter for natural placement

    // Ring-based placement for structure
    const rings = 4
    for (let r = 0; r < rings; r++) {
      const ringT = (r + 1) / (rings + 1)
      const ringR = minR + (maxR - minR) * ringT
      const countInRing = 5 + r * 3

      for (let n = 0; n < countInRing; n++) {
        const angle = (n / countInRing) * TAU + (r % 2) * (TAU / countInRing / 2)

        // Slight radial jitter
        const jitterR = ringR + (Math.random() - 0.5) * ringR * 0.12
        const jitterAngle = angle + (Math.random() - 0.5) * 0.15

        const x = cx + Math.cos(jitterAngle) * jitterR
        const y = cy + Math.sin(jitterAngle) * jitterR

        this.nodes.push({
          x,
          y,
          ring: r,
          ringT,
          index: this.nodes.length,
          size: 2.5 + Math.random() * 2,
          isVia: Math.random() < 0.25,
          phase: Math.random() * TAU,
        })
      }
    }

    // Create traces (orthogonal-ish paths connecting nearby nodes)
    const connected = new Set()

    this.nodes.forEach((node, ni) => {
      // Find nearest unconnected neighbors
      const distances = this.nodes
        .map((other, oi) => ({
          other,
          oi,
          dist: Math.sqrt((other.x - node.x) ** 2 + (other.y - node.y) ** 2),
        }))
        .filter((d) => d.oi !== ni && !connected.has(`${Math.min(ni, d.oi)}-${Math.max(ni, d.oi)}`))
        .sort((a, b) => a.dist - b.dist)

      let connectionsMade = 0
      for (const d of distances) {
        if (connectionsMade >= tracesPerNode) break
        if (d.dist > maxR * 0.45) continue // Don't connect too far

        // Build orthogonal path with 1-2 bends
        const path = this.buildTracePath(node, d.other)

        if (path.length > 1) {
          this.traces.push({
            from: node,
            to: d.other,
            path,
            length: d.dist,
            phase: ni * 0.17 + d.oi * 0.09,
            speed: 0.6 + Math.random() * 0.4,
            key: `${Math.min(ni, d.oi)}-${Math.max(ni, d.oi)}`,
          })

          connected.add(`${Math.min(ni, d.oi)}-${Math.max(ni, d.oi)}`)
          connectionsMade++
        }
      }
    })

    // Mark vias as special nodes with inner/outer ring
    this.vias = this.nodes.filter((n) => n.isVia)
  }

  buildTracePath(from, to) {
    // Create an orthogonal path with 45-degree bends (PCB style)
    const path = [{ x: from.x, y: from.y }]

    const dx = to.x - from.x
    const dy = to.y - from.y

    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      return path
    }

    // Choose bend strategy based on direction
    const useHorizontalFirst = Math.abs(dx) > Math.abs(dy)

    if (useHorizontalFirst) {
      // Horizontal then vertical, with possible intermediate point
      const midX = from.x + dx * (0.4 + Math.random() * 0.2)
      path.push({ x: midX, y: from.y })

      // Sometimes add a diagonal segment at 45 degrees
      if (Math.random() > 0.5 && Math.abs(dy) > 30) {
        const diagDist = Math.min(Math.abs(dy) * 0.3, 40)
        const diagY = from.y + (dy > 0 ? diagDist : -diagDist)
        const diagX = midX + (dx > 0 ? diagDist : -diagDist)
        path.push({ x: diagX, y: diagY })
      }

      path.push({ x: to.x, y: to.y })
    } else {
      // Vertical then horizontal
      const midY = from.y + dy * (0.4 + Math.random() * 0.2)
      path.push({ x: from.x, y: midY })

      if (Math.random() > 0.5 && Math.abs(dx) > 30) {
        const diagDist = Math.min(Math.abs(dx) * 0.3, 40)
        const diagX = from.x + (dx > 0 ? diagDist : -diagDist)
        const diagY = midY + (dy > 0 ? diagDist : -diagDist)
        path.push({ x: diagX, y: diagY })
      }

      path.push({ x: to.x, y: to.y })
    }

    return path
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    const pulseT = t * Math.PI * 2
    const cx = this.centerX
    const cy = this.centerY
    const maxR = Math.min(cx, cy) - 25

    // Layer 1: Ground plane (subtle grid)
    const gridSize = 50
    ctx.globalAlpha = alpha * 0.03 * smoothstep(0, 0.3, progress)
    ctx.strokeStyle = palette.inkFaint
    ctx.lineWidth = 0.5

    for (let gx = gridSize; gx < this.width; gx += gridSize) {
      if (Math.abs(gx - cx) < this.clearRadius * 0.8) continue
      ctx.beginPath()
      ctx.moveTo(gx, 0)
      ctx.lineTo(gx, this.height)
      ctx.stroke()
    }
    for (let gy = gridSize; gy < this.height; gy += gridSize) {
      if (Math.abs(gy - cy) < this.clearRadius * 0.8) continue
      ctx.beginPath()
      ctx.moveTo(0, gy)
      ctx.lineTo(this.width, gy)
      ctx.stroke()
    }

    // Layer 2: Traces (circuit paths)
    this.traces.forEach((trace) => {
      const traceReveal = smoothstep(0.05, 0.55, progress)
      if (traceReveal < 0.01) return

      const { path, phase, speed } = trace

      // Draw path segments
      for (let i = 0; i < path.length - 1; i++) {
        const p1 = path[i]
        const p2 = path[i + 1]

        const segT = i / (path.length - 1)
        const segReveal = clamp(traceReveal - segT * 0.2, 0, 1)
        if (segReveal < 0.01) continue

        // Trace glow
        ctx.globalAlpha = alpha * 0.06 * segReveal
        ctx.strokeStyle = palette.glow
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()

        // Main trace
        ctx.globalAlpha = alpha * (0.3 + segT * 0.15) * segReveal
        ctx.strokeStyle = palette.inkSoft
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()

        // Bright center line
        ctx.globalAlpha = alpha * 0.15 * segReveal
        ctx.strokeStyle = palette.inkLight
        ctx.lineWidth = 0.4
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }

      // Data pulse traveling along trace
      const pulsePos = ((t * speed + phase) % 1) * (path.length - 1)
      const pulseIdx = Math.floor(pulsePos)
      const pulseFrac = pulsePos - pulseIdx

      if (pulseIdx >= 0 && pulseIdx < path.length - 1) {
        const p1 = path[pulseIdx]
        const p2 = path[pulseIdx + 1]
        const px = p1.x + (p2.x - p1.x) * pulseFrac
        const py = p1.y + (p2.y - p1.y) * pulseFrac

        // Pulse glow
        ctx.globalAlpha = alpha * 0.4 * traceReveal
        ctx.fillStyle = palette.glow
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, TAU)
        ctx.fill()

        // Pulse core
        ctx.globalAlpha = alpha * 0.8 * traceReveal
        ctx.fillStyle = palette.dataPulse
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, TAU)
        ctx.fill()

        // Pulse tail
        ctx.globalAlpha = alpha * 0.2 * traceReveal
        ctx.strokeStyle = palette.dataPulse
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(
          p1.x + (p2.x - p1.x) * Math.max(0, pulseFrac - 0.15),
          p1.y + (p2.y - p1.y) * Math.max(0, pulseFrac - 0.15)
        )
        ctx.lineTo(px, py)
        ctx.stroke()
      }
    })

    // Layer 3: Nodes (component pads)
    this.nodes.forEach((node) => {
      const distFromCenter = Math.sqrt((node.x - cx) ** 2 + (node.y - cy) ** 2)
      const normDist = distFromCenter / maxR

      const nodeReveal = smoothstep(normDist * 0.3, normDist * 0.3 + 0.5, progress)
      if (nodeReveal < 0.01) return

      const nodePulse = Math.sin(pulseT + node.phase) * 0.5 + 0.5
      const size = node.size * (0.9 + nodePulse * 0.2)

      if (node.isVia) {
        // Via: ring shape (inner + outer circle)
        ctx.globalAlpha = alpha * 0.12 * nodeReveal
        ctx.fillStyle = palette.glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 2.5, 0, TAU)
        ctx.fill()

        // Outer ring
        ctx.globalAlpha = alpha * (0.35 + nodePulse * 0.2) * nodeReveal
        ctx.strokeStyle = palette.via
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 1.3, 0, TAU)
        ctx.stroke()

        // Inner fill
        ctx.globalAlpha = alpha * (0.25 + nodePulse * 0.15) * nodeReveal
        ctx.fillStyle = palette.via
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 0.7, 0, TAU)
        ctx.fill()

        // Center hole
        ctx.globalAlpha = alpha * 0.5 * nodeReveal
        ctx.fillStyle = palette.base
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 0.3, 0, TAU)
        ctx.fill()
      } else {
        // Regular pad: solid dot
        ctx.globalAlpha = alpha * 0.12 * nodeReveal
        ctx.fillStyle = palette.glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 2, 0, TAU)
        ctx.fill()

        ctx.globalAlpha = alpha * (0.4 + nodePulse * 0.25) * nodeReveal
        ctx.fillStyle = palette.inkSoft
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, TAU)
        ctx.fill()

        // Highlight
        if (nodePulse > 0.7) {
          ctx.globalAlpha = ((alpha * 0.45 * (nodePulse - 0.7)) / 0.3) * nodeReveal
          ctx.fillStyle = palette.highlightBright
          ctx.beginPath()
          ctx.arc(node.x - size * 0.25, node.y - size * 0.25, size * 0.35, 0, TAU)
          ctx.fill()
        }
      }
    })

    // Layer 4: Component outlines (subtle rectangles near some nodes)
    const componentCount = 4
    for (let ci = 0; ci < componentCount; ci++) {
      const nodeIdx = Math.floor((ci * 7 + 3) % this.nodes.length)
      const node = this.nodes[nodeIdx]
      if (!node || node.isVia) continue

      const compReveal = alpha * smoothstep(0.4, 0.8, progress) * 0.08
      if (compReveal < 0.001) continue

      const compW = 14 + ci * 4
      const compH = 8 + ci * 2
      const compAngle = (ci * TAU) / componentCount + t * 0.02

      ctx.save()
      ctx.translate(node.x, node.y)
      ctx.rotate(compAngle)

      ctx.globalAlpha = compReveal
      ctx.strokeStyle = palette.inkSoft
      ctx.lineWidth = 0.8
      ctx.strokeRect(-compW / 2, -compH / 2, compW, compH)

      // Pins on component
      const pinCount = 4
      for (let pin = 0; pin < pinCount; pin++) {
        const side = pin < pinCount / 2 ? -1 : 1
        const px = ((pin % (pinCount / 2)) - 0.5) * (compW / (pinCount / 2))
        const py = side * (compH / 2 + 2)

        ctx.globalAlpha = compReveal * 1.5
        ctx.fillStyle = palette.inkSoft
        ctx.fillRect(px - 1, py > 0 ? -1 : 1, 2, 2)
      }

      ctx.restore()
    }

    ctx.restore()
  }
}

export default CircuitBoard
