'use client'

import type { Preset } from '../../types'

type LightingPreset = {
  ambientIntensity: number
  ambientColor: string
  dirIntensity: number
  dirColor: string
}

const LIGHTING_PRESETS: Record<Preset, LightingPreset> = {
  default: {
    ambientIntensity: 0.4,
    ambientColor: '#ffffff',
    dirIntensity: 1.5,
    dirColor: '#ffeedd',
  },
  droideka: {
    ambientIntensity: 2,
    ambientColor: '#3672ff',
    dirIntensity: 2.5,
    dirColor: '#d7def5',
  },
}

export default function SceneLighting({ preset }: { preset?: Preset }) {
  const defaultPreset = preset === 'droideka' ? LIGHTING_PRESETS.droideka : LIGHTING_PRESETS.default

  const ambientColor = defaultPreset.ambientColor
  const dirColor = defaultPreset.dirColor

  return (
    <>
      <ambientLight intensity={defaultPreset.ambientIntensity} color={ambientColor} />
      <directionalLight
        intensity={defaultPreset.dirIntensity}
        color={dirColor}
        position={[5, 8, 3]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.04}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}
