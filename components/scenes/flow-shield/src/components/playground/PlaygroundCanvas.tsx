'use client'

import { useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { LEVA_THEME } from '../theme/theme'
import SceneContent from './SceneContent'
import type { SceneMode } from './SceneContent'
import UIOverlay from '../overlay/UIOverlay'
import OverlayButtons from '../overlay/OverlayButtons'
import type { Preset } from '../../types'
import LoadingOverlay from '../overlay/LoadingOverlay'

export default function PlaygroundCanvas() {
  const [showGrid, setShowGrid] = useState(true)
  const [hideLeva, setHideLeva] = useState(false)
  const [glbUrl, setGlbUrl] = useState<string | null>(null)
  const [preset, setPreset] = useState<Preset>('default')
  const [isLoadingModel, setIsLoadingModel] = useState(false)
  const glbUrlRef = useRef<string | null>(null)

  const handleLoadGlb = useCallback((file: File) => {
    if (glbUrlRef.current) URL.revokeObjectURL(glbUrlRef.current)
    const url = URL.createObjectURL(file)
    glbUrlRef.current = url
    setIsLoadingModel(true)
    setGlbUrl(url)
  }, [])

  const handleModelLoaded = useCallback(() => {
    setIsLoadingModel(false)
  }, [])

  const handleClearGlb = useCallback(() => {
    if (glbUrlRef.current) URL.revokeObjectURL(glbUrlRef.current)
    glbUrlRef.current = null
    setGlbUrl(null)
  }, [])

  const { mode } = useControls(
    'Scene',
    {
      mode: {
        value: 'Background' as SceneMode,
        options: ['Background', 'Frame'] as SceneMode[],
        label: 'Mode',
      },
    },
    { collapsed: true }
  )

  return (
    <>
      <Leva
        theme={LEVA_THEME}
        titleBar={{ title: 'CONTROLS' }}
        collapsed={false}
        flat={false}
        oneLineLabels={false}
        hidden={hideLeva}
      />
      <div style={{ position: 'fixed', inset: 0 }}>
        <Canvas
          shadows
          camera={{ position: [8, 5, 8], fov: 50, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0e0d0c' }}
          dpr={[1, 1.5]}
        >
          <SceneContent
            showGrid={showGrid}
            mode={mode}
            glbUrl={glbUrl}
            onModelLoaded={handleModelLoaded}
            preset={preset}
          />
        </Canvas>
      </div>
      <UIOverlay />
      <OverlayButtons
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid((v) => !v)}
        hideLeva={hideLeva}
        onToggleLeva={() => setHideLeva((v) => !v)}
        hasGlb={glbUrl !== null}
        onLoadGlb={handleLoadGlb}
        onClearGlb={handleClearGlb}
        preset={preset}
        onSetPreset={setPreset}
      />
      <LoadingOverlay visible={isLoadingModel} />
    </>
  )
}
