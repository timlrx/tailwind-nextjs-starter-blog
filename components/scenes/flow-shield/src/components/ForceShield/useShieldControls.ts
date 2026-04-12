'use client'

import type { MutableRefObject } from 'react'
import { button, useControls } from 'leva'

const SHIELD_DEFAULTS = {
  debugAlwaysOn: true,
  manualReveal: false,
  revealProgress: 0.0,
  posX: 0,
  posY: 2,
  posZ: 0.2,
  scale: 1,
  color: '#26aeff',
  hexScale: 3.0,
  hexOpacity: 0.13,
  showHex: true,
  edgeWidth: 0.06,
  fresnelPower: 1.8,
  fresnelStrength: 1.75,
  opacity: 0.76,
  fadeStart: 0.0,
  revealSpeed: 3.5,
  flashSpeed: 0.6,
  flashIntensity: 0.11,
  noiseScale: 1.3,
  noiseEdgeColor: '#26aeff',
  noiseEdgeWidth: 0.02,
  noiseEdgeIntensity: 10.0,
  noiseEdgeSmoothness: 0.5,
  flowScale: 2.4,
  flowSpeed: 1.13,
  flowIntensity: 4,
  hitRingSpeed: 1.75,
  hitRingWidth: 0.12,
  hitMaxRadius: 0.85,
  hitDuration: 1.8,
  hitIntensity: 4.1,
  hitImpactRadius: 0.3,
  hitDamage: 5,
} as const

export function useShieldControls(lifeRef: MutableRefObject<number>) {
  const [controls, setControls] = useControls(() => ({
    color: { value: SHIELD_DEFAULTS.color, label: 'Color' },
    opacity: { value: SHIELD_DEFAULTS.opacity, min: 0.2, max: 1, step: 0.01, label: 'Opacity' },
    showHex: { value: SHIELD_DEFAULTS.showHex, label: 'Hex Grid' },
    hexScale: {
      value: SHIELD_DEFAULTS.hexScale,
      min: 1,
      max: 8,
      step: 0.1,
      label: 'Hex Size',
    },
    hexOpacity: {
      value: SHIELD_DEFAULTS.hexOpacity,
      min: 0,
      max: 0.5,
      step: 0.01,
      label: 'Hex Strength',
    },
    flowSpeed: {
      value: SHIELD_DEFAULTS.flowSpeed,
      min: 0,
      max: 2,
      step: 0.01,
      label: 'Flow Speed',
    },
    flowIntensity: {
      value: SHIELD_DEFAULTS.flowIntensity,
      min: 0,
      max: 4,
      step: 0.05,
      label: 'Flow Strength',
    },
    hitIntensity: {
      value: SHIELD_DEFAULTS.hitIntensity,
      min: 0,
      max: 8,
      step: 0.1,
      label: 'Hit Glow',
    },
    'Reset Life': button(() => {
      lifeRef.current = 1.0
    }),
  }))

  return [{ ...SHIELD_DEFAULTS, ...controls }, setControls] as const
}
