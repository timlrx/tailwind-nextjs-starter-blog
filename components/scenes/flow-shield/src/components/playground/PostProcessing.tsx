'use client'

import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import * as THREE from 'three'

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={0} frameBufferType={THREE.HalfFloatType}>
      <Bloom
        intensity={1.6}
        luminanceThreshold={0.1}
        radius={0.56}
        mipmapBlur
        kernelSize={KernelSize.LARGE}
      />
      <Noise premultiply={false} opacity={0} />
    </EffectComposer>
  )
}
