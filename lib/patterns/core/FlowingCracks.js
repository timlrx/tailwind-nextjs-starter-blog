// ============================================================================
// PATTERN: FLOWING CRACKS
// Branching crack patterns with sub-branches and traveling pulse nodes
// ============================================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)

const palette = {
  crack: 'hsla(40, 20%, 72%, 0.4)',
  crackBright: 'hsla(45, 35%, 88%, 0.75)',
  glow: 'hsla(40, 25%, 88%, 0.15)',
  node: 'hsla(40, 30%, 92%, 0.8)',
  nodeGlow: 'hsla(40, 25%, 85%, 0.3)',
}

export const config = { key: 'cracks', name: 'Flowing Cracks', cycleMs: 7500, clearRadius: 0.22 }

export class FlowingCracks {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.cx = width / 2
    this.cy = height / 2
    this.branches = []
    this.nodes = []
    this.build()
  }

  build() {
    const maxR = Math.min(this.cx, this.cy) - 30
    const branchCount = 8

    for (let b = 0; b < branchCount; b++) {
      const baseAngle = (b / branchCount) * Math.PI * 2
      const startD = this.clearRadius * 1.1
      const segments = 7
      const points = []

      for (let s = 0; s < segments; s++) {
        const t = s / (segments - 1)
        const dist = startD + (maxR - startD) * t
        const angle = baseAngle + Math.sin(t * Math.PI * 2) * 0.15
        points.push({
          x: this.cx + Math.cos(angle) * dist,
          y: this.cy + Math.sin(angle) * dist,
          dist,
          baseAngle: angle,
          t,
          branchIndex: b,
          segmentIndex: s,
        })
      }

      this.branches.push({
        branchIndex: b,
        points,
        phase: b * 0.12,
        splitAngle: Math.sin(b * 1.5) * 0.4,
      })
      for (let s = 0; s < points.length - 1; s++) this.nodes.push(points[s])
    }

    // Sub-branches
    for (let b = 0; b < branchCount; b++) {
      const branch = this.branches[b]
      const splits = 2 + Math.floor(Math.abs(Math.sin(b * 0.8)) * 2)
      for (let s = 1; s < splits + 1; s++) {
        if (s >= branch.points.length - 1) break
        const splitPoint = branch.points[s]
        const splitAngle = splitPoint.baseAngle + branch.splitAngle * (s % 2 === 0 ? 1 : -1)
        const startD = splitPoint.dist
        const endD = startD + Math.min(this.cx, this.cy) * 0.25
        const subPoints = []
        for (let ss = 0; ss < 5; ss++) {
          const st = ss / 4
          const dist = startD + (endD - startD) * st
          const angle = splitAngle + Math.sin(st * Math.PI) * 0.2
          subPoints.push({
            x: this.cx + Math.cos(angle) * dist,
            y: this.cy + Math.sin(angle) * dist,
            dist,
            baseAngle: angle,
            t: splitPoint.t + st * (1 - splitPoint.t) * 0.3,
            branchIndex: b,
            isSubBranch: true,
          })
        }
        this.branches.push({
          branchIndex: b,
          points: subPoints,
          phase: b * 0.12 + 0.06,
          parentBranch: branch,
        })
        for (let ss = 0; ss < subPoints.length - 1; ss++) this.nodes.push(subPoints[ss])
      }
    }
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)
    const wavePhase = t * Math.PI * 2 * 0.5

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    this.branches.forEach((branch) => {
      const branchProgress = clamp((progress - branch.phase * 0.15) * 2.5, 0, 1)
      if (branchProgress < 0.01) return
      const points = branch.points
      if (points.length < 2) return
      const pulse = envelope((t + branch.phase * 0.5) % 1)

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i],
          p2 = points[i + 1]
        const segT = i / (points.length - 1)
        const segReveal = clamp(branchProgress - segT * 0.2, 0, 1)
        if (segReveal < 0.01) continue

        const wave1 = envelope((wavePhase - segT * 0.8) % 1)
        const wave2 = envelope((wavePhase * 0.6 + p1.dist * 0.01) % 1)

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        const segments = Math.max(3, Math.floor(Math.hypot(p2.x - p1.x, p2.y - p1.y) / 15))
        for (let s = 1; s <= segments; s++) {
          const st = s / segments
          const x = p1.x + (p2.x - p1.x) * st
          const y = p1.y + (p2.y - p1.y) * st
          const perpX = -(p2.y - p1.y) / (p2.dist - p1.dist + 0.001)
          const perpY = (p2.x - p1.x) / (p2.dist - p1.dist + 0.001)
          const waveOffset = Math.sin(st * Math.PI * 2 + wavePhase) * 4 * (0.5 + wave1 * 0.5)
          ctx.lineTo(x + perpX * waveOffset, y + perpY * waveOffset)
        }

        ctx.globalAlpha = alpha * 0.2 * segReveal
        ctx.strokeStyle = palette.glow
        ctx.lineWidth = 5
        ctx.stroke()

        ctx.globalAlpha = alpha * (0.6 + wave2 * 0.2) * segReveal
        ctx.strokeStyle = palette.crack
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
    })

    this.nodes.forEach((node) => {
      const nodeProgress = clamp((progress - node.t * 0.1) * 2.5, 0, 1)
      if (nodeProgress < 0.01) return
      const distFromCenter = Math.hypot(node.x - this.cx, node.y - this.cy)
      if (distFromCenter < this.clearRadius * 0.85) return
      const pulse = envelope((t + node.t * 0.5) % 1)
      const size = 1.5 + pulse * 2
      const intensity = pulse

      ctx.globalAlpha = alpha * 0.2 * intensity * nodeProgress
      ctx.fillStyle = palette.glow
      ctx.beginPath()
      ctx.arc(node.x, node.y, size + 1.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = alpha * (0.5 + intensity * 0.3) * nodeProgress
      ctx.fillStyle = palette.crack
      ctx.beginPath()
      ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
      ctx.fill()

      if (intensity > 0.6) {
        ctx.globalAlpha = ((alpha * 0.5 * (intensity - 0.6)) / 0.4) * nodeProgress
        ctx.fillStyle = palette.crackBright
        ctx.beginPath()
        ctx.arc(node.x - size * 0.2, node.y - size * 0.2, size * 0.35, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    ctx.restore()
  }
}
