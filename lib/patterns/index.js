// ============================================================================
// PATTERN REGISTRY - Complex Organic Geometric Patterns
// ============================================================================

import { CircuitBoard, config as circuitConfig } from './core/CircuitBoard'
import { ConcentricRings, config as ringsConfig } from './core/ConcentricRings'
import { NestedHexagons, config as hexConfig } from './core/NestedHexagons'
import { ParticleSwarm, config as swarmConfig } from './core/ParticleSwarm'
import { ConstellationGrid, config as constellationConfig } from './core/ConstellationGrid'
import { WaveInterference, config as waveConfig } from './core/WaveInterference'
import { GameOfLife, config as lifeConfig } from './core/GameOfLife'

export const patternConfigs = [
  { ...ringsConfig, key: 'rings', name: 'Concentric Rings', cycleMs: 7500, clearRadius: 0.23 },
  { ...hexConfig, key: 'hexagons', name: 'Nested Hexagons', cycleMs: 8000, clearRadius: 0.22 },
  { ...swarmConfig, key: 'swarm', name: 'Particle Swarm', cycleMs: 7000, clearRadius: 0.24 },
  {
    ...constellationConfig,
    key: 'constellation',
    name: 'Constellation Grid',
    cycleMs: 8000,
    clearRadius: 0.24,
  },
  { ...waveConfig, key: 'waves', name: 'Wave Interference', cycleMs: 8000, clearRadius: 0.24 },
  { ...lifeConfig, key: 'life', name: 'Game of Life', cycleMs: 9000, clearRadius: 0.24 },
]

export function createPattern(key, width, height, config, clearRadius) {
  switch (key) {
    case 'rings':
      return new ConcentricRings(width, height, clearRadius)
    case 'hexagons':
      return new NestedHexagons(width, height, clearRadius)
    case 'swarm':
      return new ParticleSwarm(width, height, clearRadius)
    case 'constellation':
      return new ConstellationGrid(width, height, clearRadius)
    case 'waves':
      return new WaveInterference(width, height, clearRadius)
    case 'life':
      return new GameOfLife(width, height, clearRadius)
    default:
      console.warn(`Unknown pattern key: ${key}, falling back to ConcentricRings`)
      return new ConcentricRings(width, height, clearRadius)
  }
}

export function getPatternConfig(key) {
  return patternConfigs.find((p) => p.key === key)
}

export function getRandomPatternConfig() {
  return patternConfigs[Math.floor(Math.random() * patternConfigs.length)]
}

export function resolvePatternFromParam(patternParam) {
  if (!patternParam) return getRandomPatternConfig()
  const normalized = patternParam.trim().toLowerCase()
  const byKey = getPatternConfig(normalized)
  if (byKey) return byKey
  const numeric = Number(normalized)
  if (!Number.isNaN(numeric)) {
    const index = numeric > 0 ? numeric - 1 : numeric
    return patternConfigs[Math.max(0, Math.min(index, patternConfigs.length - 1))]
  }
  return getRandomPatternConfig()
}

export { CircuitBoard } from './core/CircuitBoard'
export { ConcentricRings } from './core/ConcentricRings'
export { NestedHexagons } from './core/NestedHexagons'
export { ParticleSwarm } from './core/ParticleSwarm'
export { ConstellationGrid } from './core/ConstellationGrid'
export { WaveInterference } from './core/WaveInterference'
export { GameOfLife } from './core/GameOfLife'
