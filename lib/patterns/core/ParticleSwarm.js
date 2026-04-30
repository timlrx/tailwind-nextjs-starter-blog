// ============================================================================
// PATTERN: PARTICLE SWARM
// Flowing particles that orbit the center and connect with dynamic lines,
// creating organic swarm behavior with emergent patterns.
// ============================================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min, max))
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)

const palette = {
  ink: 'hsla(40, 20%, 92%, 0.75)',
  inkSoft: 'hsla(35, 18%, 70%, 0.45)',
  inkFaint: 'hsla(35, 12%, 55%, 0.2)',
  glow: 'hsla(40, 25%, 88%, 0.35)',
  highlight: 'hsla(45, 35%, 85%, 0.7)',
  particleCore: 'hsla(40, 30%, 95%, 0.9)',
  connection: 'hsla(35, 25%, 75%, 0.25)',
}

export const config = {
  key: 'swarm',
  name: 'Particle Swarm',
  cycleMs: 7000,
  clearRadius: 0.24,
}

class Particle {
  constructor(x, y, index, total) {
    this.index = index
    this.baseX = x
    this.baseY = y
    this.x = x
    this.y = y

    const angle = (index / total) * Math.PI * 2
    this.orbitAngle = angle
    this.orbitRadius = Math.sqrt(x * x + y * y)
    this.orbitSpeed = 0.0005 + Math.random() * 0.001
    this.orbitDirection = index % 2 === 0 ? 1 : -1

    this.baseSize = 1.5 + Math.random() * 2
    this.size = this.baseSize
    this.pulsePhase = Math.random() * Math.PI * 2
    this.pulseSpeed = 0.002 + Math.random() * 0.003

    this.driftX = (Math.random() - 0.5) * 0.3
    this.driftY = (Math.random() - 0.5) * 0.3
    this.driftPhase = Math.random() * Math.PI * 2
  }

  update(t, centerX, centerY) {
    this.orbitAngle += this.orbitSpeed * this.orbitDirection
    const drift = Math.sin(t * Math.PI * 2 + this.driftPhase) * 15
    this.x = centerX + Math.cos(this.orbitAngle) * this.orbitRadius + this.driftX * drift
    this.y = centerY + Math.sin(this.orbitAngle) * this.orbitRadius + this.driftY * drift
    this.size = this.baseSize * (1 + Math.sin(t * Math.PI * 2 * 3 + this.pulsePhase) * 0.3)
  }
}

export class ParticleSwarm {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.centerX = width / 2
    this.centerY = height / 2
    this.particles = []
    this.connections = []
    this.build()
  }

  build() {
    const particleCount = 48
    const maxRadius = Math.min(this.centerX, this.centerY) - 20
    const rings = 3
    const particlesPerRing = Math.floor(particleCount / rings)

    for (let r = 0; r < rings; r++) {
      const ringT = (r + 1) / (rings + 1)
      const ringRadius = this.clearRadius * 1.3 + (maxRadius - this.clearRadius) * ringT * 0.85

      for (let i = 0; i < particlesPerRing; i++) {
        const angle = (i / particlesPerRing) * Math.PI * 2 + r * 0.5
        const x = this.centerX + Math.cos(angle) * ringRadius
        const y = this.centerY + Math.sin(angle) * ringRadius

        const particle = new Particle(
          x - this.centerX,
          y - this.centerY,
          this.particles.length,
          particleCount
        )
        particle.orbitRadius = ringRadius
        particle.orbitAngle = angle

        this.particles.push(particle)
      }
    }
  }

  findConnections() {
    this.connections = []
    const connectionDistance = 85
    const maxConnectionsPerParticle = 3

    for (let i = 0; i < this.particles.length; i++) {
      let connectionCount = 0
      for (let j = i + 1; j < this.particles.length; j++) {
        if (connectionCount >= maxConnectionsPerParticle) break
        const dx = this.particles[j].x - this.particles[i].x
        const dy = this.particles[j].y - this.particles[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < connectionDistance) {
          this.connections.push({
            from: i,
            to: j,
            distance: dist,
            strength: 1 - dist / connectionDistance,
          })
          connectionCount++
        }
      }
    }
  }

  drawParticle(ctx, particle, reveal, t) {
    if (reveal <= 0.01) return
    ctx.save()
    ctx.translate(particle.x, particle.y)

    ctx.globalAlpha = reveal * 0.3
    ctx.fillStyle = palette.glow
    ctx.beginPath()
    ctx.arc(0, 0, particle.size * 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalAlpha = reveal * 0.9
    ctx.fillStyle = palette.particleCore
    ctx.beginPath()
    ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalAlpha = reveal * 0.5
    ctx.fillStyle = palette.highlight
    ctx.beginPath()
    ctx.arc(-particle.size * 0.3, -particle.size * 0.3, particle.size * 0.4, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  drawConnection(ctx, connection, reveal) {
    if (reveal <= 0.01) return
    const p1 = this.particles[connection.from]
    const p2 = this.particles[connection.to]
    ctx.globalAlpha = reveal * connection.strength * 0.4
    ctx.strokeStyle = palette.connection
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)

    this.particles.forEach((p) => p.update(t, this.centerX, this.centerY))
    this.findConnections()

    const connectionReveal = alpha * clamp((progress - 0.1) * 2, 0, 1)
    const particleReveal = alpha * clamp((progress - 0.15) * 2.5, 0, 1)

    ctx.save()

    this.connections.forEach((conn) => {
      this.drawConnection(ctx, conn, connectionReveal)
    })

    this.particles.forEach((p, i) => {
      const particleProgress = clamp(progress * 1.5 - (i / this.particles.length) * 0.3, 0, 1)
      const pReveal = alpha * particleProgress
      this.drawParticle(ctx, p, pReveal, t)
    })

    ctx.restore()
  }
}
