'use client'

import SceneContent from './src/components/playground/SceneContent'
import { useCanvasApi } from 'app/canvas-state'
import { memo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MODE = 'Background' as const
const PRESET = 'default' as const

export default memo(function FlowShieldScene({
  perfSucks: _perfSucks = false,
}: {
  perfSucks?: boolean
}) {
  const setIsLoaded = useCanvasApi((state) => state.setIsLoaded)

  useEffect(() => {
    setIsLoaded(true)
  }, [setIsLoaded])

  return (
    <>
      <SceneBackground />
      <SceneContent showGrid mode={MODE} glbUrl={null} preset={PRESET} />
    </>
  )
})

function SceneBackground() {
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    scene.background = new THREE.Color('#050816')
  }, [scene])

  return null
}
