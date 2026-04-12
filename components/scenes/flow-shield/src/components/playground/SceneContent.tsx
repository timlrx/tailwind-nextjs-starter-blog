'use client'

import { Suspense } from 'react'
import SceneCamera from './SceneCamera'
import SceneLighting from './SceneLighting'
import SceneEnvironment from './SceneEnvironment'
import GridFloor from './GridFloor'
import GlbModel from './GlbModel'
import ForceShield from '../ForceShield'
import PostProcessing from './PostProcessing'
import { Droideka } from './Droideka'
import type { Preset } from '../../types'

export type SceneMode = 'Background' | 'Frame'

interface SceneContentProps {
  showGrid: boolean
  mode: SceneMode
  glbUrl: string | null
  onModelLoaded?: () => void
  preset: Preset
  onDroidekaLoaded?: () => void
}

export default function SceneContent({
  showGrid,
  mode,
  glbUrl,
  onModelLoaded,
  preset,
  onDroidekaLoaded,
}: SceneContentProps) {
  return (
    <>
      <SceneCamera preset={preset} />
      <SceneLighting preset={preset} />
      <SceneEnvironment mode={mode} />
      {showGrid && <GridFloor mode={mode} />}
      {preset === 'droideka' ? (
        <>
          <Suspense fallback={null}>
            <group scale={0.28} position={[-0.6, 0, 0.2]}>
              <Droideka onLoaded={onDroidekaLoaded} />
            </group>
          </Suspense>
          <ForceShield posYOverride={1} preset={preset} />
        </>
      ) : glbUrl ? (
        <Suspense fallback={null}>
          <GlbModel url={glbUrl} onLoaded={onModelLoaded} mode={mode} />
        </Suspense>
      ) : (
        <ForceShield preset={preset} />
      )}
      <PostProcessing />
    </>
  )
}
