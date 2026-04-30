// ============================================================================
// PATTERN: GAME OF LIFE
// Conway's Game of Life on a grid with warm ink tones
// ============================================================================

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const envelope = (t) => Math.sin(t * Math.PI)
const triangle = (t) => 1 - Math.abs(2 * t - 1)

const palette = {
  cell: 'hsla(40, 20%, 85%, 0.8)',
  cellGlow: 'hsla(40, 25%, 88%, 0.25)',
  highlight: 'hsla(45, 35%, 92%, 0.5)',
}

export const config = { key: 'life', name: 'Game of Life', cycleMs: 9000, clearRadius: 0.24 }

export class GameOfLife {
  constructor(width, height, clearRadius) {
    this.width = width
    this.height = height
    this.clearRadius = clearRadius
    this.cx = width / 2
    this.cy = height / 2
    this.cellSize = 14
    this.cols = Math.ceil(this.width / this.cellSize)
    this.rows = Math.ceil(this.height / this.cellSize)
    this.grid = []
    this.nextGrid = []
    this.lastT = -1
    this.build()
  }

  build() {
    for (let y = 0; y < this.rows; y++) {
      this.grid[y] = new Array(this.cols).fill(0)
      this.nextGrid[y] = new Array(this.cols).fill(0)
    }

    // Seed with sparse random cells
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cellCx = (x + 0.5) * this.cellSize
        const cellCy = (y + 0.5) * this.cellSize
        const dist = Math.hypot(cellCx - this.cx, cellCy - this.cy)
        if (dist < this.clearRadius * 1.4) continue
        this.grid[y][x] = Math.random() < 0.08 ? 1 : 0
      }
    }
  }

  countNeighbors(x, y) {
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        const ny = (y + dy + this.rows) % this.rows
        const nx = (x + dx + this.cols) % this.cols
        count += this.grid[ny][nx]
      }
    }
    return count
  }

  step() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cellCx = (x + 0.5) * this.cellSize
        const cellCy = (y + 0.5) * this.cellSize
        const dist = Math.hypot(cellCx - this.cx, cellCy - this.cy)
        if (dist < this.clearRadius * 1.4) {
          this.nextGrid[y][x] = 0
          continue
        }
        const neighbors = this.countNeighbors(x, y)
        const alive = this.grid[y][x] === 1
        if (alive) {
          this.nextGrid[y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0
        } else {
          this.nextGrid[y][x] = neighbors === 3 ? 1 : 0
        }
      }
    }
    const temp = this.grid
    this.grid = this.nextGrid
    this.nextGrid = temp
  }

  render(ctx, t) {
    const progress = triangle(t)
    const alpha = envelope(t)

    const stepsPerCycle = 18
    const currentStep = Math.floor(t * stepsPerCycle)
    const lastStep = Math.floor(this.lastT * stepsPerCycle)
    if (this.lastT < 0 || currentStep !== lastStep || (t < this.lastT && this.lastT > 0.9)) {
      this.step()
    }
    this.lastT = t

    ctx.save()

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grid[y][x] !== 1) continue
        const cellX = x * this.cellSize
        const cellY = y * this.cellSize
        const cellCx = cellX + this.cellSize / 2
        const cellCy = cellY + this.cellSize / 2
        const dist = Math.hypot(cellCx - this.cx, cellCy - this.cy)
        if (dist < this.clearRadius * 1.4) continue

        const maxDist = Math.hypot(this.cx, this.cy)
        const normalizedDist = dist / maxDist
        const cellReveal = clamp((progress * 2 - (1 - normalizedDist)) * 2, 0, 1)
        if (cellReveal < 0.05) continue

        ctx.globalAlpha = alpha * 0.25 * cellReveal
        ctx.fillStyle = palette.cellGlow
        ctx.beginPath()
        ctx.arc(cellCx, cellCy, this.cellSize * 0.55, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = alpha * 0.75 * cellReveal
        ctx.fillStyle = palette.cell
        const inset = 1
        const r = 2
        ctx.beginPath()
        ctx.roundRect(
          cellX + inset,
          cellY + inset,
          this.cellSize - inset * 2,
          this.cellSize - inset * 2,
          r
        )
        ctx.fill()

        ctx.globalAlpha = alpha * 0.45 * cellReveal
        ctx.fillStyle = palette.highlight
        ctx.beginPath()
        ctx.arc(cellCx, cellCy, this.cellSize * 0.15, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.restore()
  }
}
