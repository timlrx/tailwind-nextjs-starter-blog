'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import type { SceneMode } from './SceneContent'

export default function DemoSphere({ mode }: { mode: SceneMode }) {
  const meshRef = useRef<Mesh>(null!)
  const wireframe = mode === 'Frame'

  useFrame(() => {
    meshRef.current.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.2
  })

  return (
    <mesh ref={meshRef} position={[0, 1, 0]} castShadow={!wireframe}>
      <sphereGeometry args={[0.8, wireframe ? 16 : 64, wireframe ? 16 : 64]} />
      {wireframe ? (
        <meshBasicMaterial color={'#adadad'} wireframe />
      ) : (
        <meshStandardMaterial color={'#c8b89a'} roughness={0.25} metalness={0.6} />
      )}
    </mesh>
  )
}
