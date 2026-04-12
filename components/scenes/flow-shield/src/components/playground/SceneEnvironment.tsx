'use client'

import { Environment } from '@react-three/drei'
import type { SceneMode } from './SceneContent'

type EnvPreset =
  | 'apartment'
  | 'city'
  | 'dawn'
  | 'forest'
  | 'lobby'
  | 'night'
  | 'park'
  | 'studio'
  | 'sunset'
  | 'warehouse'

export default function SceneEnvironment({ mode }: { mode: SceneMode }) {
  return (
    <Environment
      preset={'night' as EnvPreset}
      background={mode === 'Background'}
      backgroundBlurriness={0.9}
      backgroundIntensity={0.1}
      environmentIntensity={0.3}
    />
  )
}
