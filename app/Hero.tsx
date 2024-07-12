import dynamic from 'next/dynamic'
import CausticOverlay from '@/components/CausticOverlay'

const CausticScene = dynamic(() => import('@/components/CausticScene'), { ssr: false })

export function Hero() {
  return (
    <>
      <CausticScene />
      <CausticOverlay />
    </>
  )
}
