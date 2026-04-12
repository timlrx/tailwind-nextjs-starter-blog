'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Grid, MeshReflectorMaterial } from '@react-three/drei'
import { COLORS } from '../theme/theme'
import type { SceneMode } from './SceneContent'

function useRadialAlphaMap(size: number, innerStop: number, outerStop: number) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    const half = size / 2
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(Math.min(innerStop, 0.99), '#ffffff')
    gradient.addColorStop(Math.min(outerStop, 1), '#000000')
    gradient.addColorStop(1, '#000000')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [size, innerStop, outerStop])
}

export default function GridFloor({ mode }: { mode: SceneMode }) {
  const alphaMap = useRadialAlphaMap(512, 0.16, 0.66)
  const showFloor = mode === 'Background'

  return (
    <group>
      {/* Reflective floor plane */}
      {showFloor && (
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <MeshReflectorMaterial
            mirror={1}
            blur={[512, 512]}
            resolution={512}
            mixBlur={2}
            mixStrength={1}
            roughness={0.5}
            metalness={0.5}
            color="#ffffff"
            depthScale={1.8}
            transparent
            alphaMap={alphaMap}
          />
        </mesh>
      )}

      {/* Visual grid rendered on top */}
      <Grid
        position={[0, 0, 0]}
        args={[100, 100]}
        cellSize={3}
        cellThickness={1.4}
        cellColor={COLORS.gridCell}
        sectionSize={1}
        sectionThickness={0.5}
        sectionColor={COLORS.gridSection}
        fadeDistance={67}
        fadeStrength={3.2}
        infiniteGrid
        followCamera={false}
      />
    </group>
  )
}
