// ============================================================================
// PATTERN REGISTRY
// Central registry for all portal animation patterns
// ============================================================================

import { GameOfLifePattern, config as lifeConfig } from './core/GameOfLife'
import { WatchingEyes, config as eyesConfig } from './core/WatchingEyes'
import { TriangulatedRings, config as ringsConfig } from './core/ConcentricRings'
import { NestedHexagons, config as hexagonConfig } from './core/NestedHexagons'
import { TopographicPattern, config as topoConfig } from './core/Topographic'
import { AuroraWaves, config as auroraConfig } from './core/AuroraWaves'
import { FlowerOfLife, config as flowerConfig } from './core/FlowerOfLife'
import { VortexSpirals, config as vortexConfig } from './core/VortexSpirals'
import { CircuitBoard, config as circuitConfig } from './core/CircuitBoard'

/**
 * All available pattern configurations
 */
export const patternConfigs = [
  {
    ...lifeConfig,
    key: 'life',
    name: 'Game of Life',
    cycleMs: 8000,
    golGridSize: 12,
    clearRadius: 0.24,
  },
  {
    ...eyesConfig,
    key: 'metamorph',
    name: 'Watching Eye',
    cycleMs: 6000,
    gridX: 24,
    gridY: 14,
    warpSwirl: 0.85,
    clearRadius: 0.24,
  },
  {
    ...ringsConfig,
    key: 'tri',
    name: 'Concentric Ring',
    cycleMs: 6500,
    flipWaves: 4,
    swirl: 0.75,
    clearRadius: 0.23,
  },
  {
    ...hexagonConfig,
    key: 'hexagon',
    name: 'Nested Hexagons',
    cycleMs: 8000,
    clearRadius: 0.22,
  },
  // ── New visual patterns (replaced old 5-9) ──
  {
    ...topoConfig,
    key: 'topo',
    name: 'Topographic',
    cycleMs: 8000,
    contourCount: 18,
    clearRadius: 0.22,
  },
  {
    ...auroraConfig,
    key: 'aurora',
    name: 'Aurora Waves',
    cycleMs: 8500,
    waveBands: 7,
    clearRadius: 0.24,
  },
  {
    ...flowerConfig,
    key: 'flower',
    name: 'Flower of Life',
    cycleMs: 9000,
    rings: 4,
    clearRadius: 0.22,
  },
  {
    ...vortexConfig,
    key: 'vortex',
    name: 'Vortex Spirals',
    cycleMs: 8000,
    spiralCount: 8,
    clearRadius: 0.22,
  },
  {
    ...circuitConfig,
    key: 'circuit',
    name: 'Circuit Board',
    cycleMs: 7500,
    nodeCount: 28,
    clearRadius: 0.22,
  },
]

/**
 * Create a pattern instance from a config key
 *
 * @param {string} key - Pattern key (life, metamorph, tri, union)
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {object} config - Pattern configuration overrides
 * @param {number} clearRadius - Clear radius for center area
 * @returns {object} Pattern instance
 */
export function createPattern(key, width, height, config, clearRadius) {
  switch (key) {
    case 'life':
      return new GameOfLifePattern(width, height, config, clearRadius)
    case 'metamorph':
      return new WatchingEyes(width, height, clearRadius, config)
    case 'tri':
      return new TriangulatedRings(width, height, clearRadius, config)
    case 'hexagon':
      return new NestedHexagons(width, height, clearRadius, config)
    case 'topo':
      return new TopographicPattern(width, height, clearRadius, config)
    case 'aurora':
      return new AuroraWaves(width, height, clearRadius, config)
    case 'flower':
      return new FlowerOfLife(width, height, clearRadius, config)
    case 'vortex':
      return new VortexSpirals(width, height, clearRadius, config)
    case 'circuit':
      return new CircuitBoard(width, height, clearRadius, config)
    default:
      console.warn(`Unknown pattern key: ${key}, falling back to Game of Life`)
      return new GameOfLifePattern(width, height, config, clearRadius)
  }
}

/**
 * Get a pattern config by key
 *
 * @param {string} key - Pattern key
 * @returns {object|undefined} Pattern config
 */
export function getPatternConfig(key) {
  return patternConfigs.find((p) => p.key === key)
}

/**
 * Get a random pattern config
 *
 * @returns {object} Random pattern config
 */
export function getRandomPatternConfig() {
  return patternConfigs[Math.floor(Math.random() * patternConfigs.length)]
}

/**
 * Resolve pattern from URL parameter
 *
 * @param {string|null} patternParam - URL pattern parameter
 * @returns {object} Pattern config
 */
export function resolvePatternFromParam(patternParam) {
  if (!patternParam) return getRandomPatternConfig()

  const normalized = patternParam.trim().toLowerCase()

  // Try to find by key
  const byKey = getPatternConfig(normalized)
  if (byKey) return byKey

  // Try numeric index
  const numeric = Number(normalized)
  if (!Number.isNaN(numeric)) {
    const index = numeric > 0 ? numeric - 1 : numeric
    const clampedIndex = Math.max(0, Math.min(index, patternConfigs.length - 1))
    return patternConfigs[clampedIndex]
  }

  // Fallback to random
  return getRandomPatternConfig()
}

// Export all pattern classes
export { GameOfLifePattern } from './core/GameOfLife'
export { WatchingEyes } from './core/WatchingEyes'
export { TriangulatedRings } from './core/ConcentricRings'
export { NestedHexagons } from './core/NestedHexagons'
export { TopographicPattern } from './core/Topographic'
export { AuroraWaves } from './core/AuroraWaves'
export { FlowerOfLife } from './core/FlowerOfLife'
export { VortexSpirals } from './core/VortexSpirals'
export { CircuitBoard } from './core/CircuitBoard'
