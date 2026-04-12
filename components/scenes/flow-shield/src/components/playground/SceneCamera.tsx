'use client'

import { useRef, useEffect } from 'react'
import type { ComponentRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MathUtils, PerspectiveCamera } from 'three'
import type { Preset } from '../../types'

const DEFAULT_POS: [number, number, number] = [8, 5, 8]

const TARGETS: Record<Preset, [number, number, number]> = {
  default: [0, 2, 0.2],
  droideka: [0, 1, 0.2],
}

export default function SceneCamera({ preset = 'default' }: { preset?: Preset }) {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls> | null>(null)
  const camera = useThree((s) => s.camera)

  useEffect(() => {
    camera.position.set(...DEFAULT_POS)
    if (camera instanceof PerspectiveCamera) {
      camera.fov = 26
      camera.updateProjectionMatrix()
    }
  }, [camera])

  // Re-center camera when preset changes
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    const [tx, ty, tz] = TARGETS[preset]
    controls.target.set(tx, ty, tz)
    controls.update()
  }, [preset])

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      target={TARGETS[preset]}
      autoRotate
      autoRotateSpeed={0.2}
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={16}
      minPolarAngle={MathUtils.degToRad(10)}
      maxPolarAngle={MathUtils.degToRad(85)}
    />
  )
}
