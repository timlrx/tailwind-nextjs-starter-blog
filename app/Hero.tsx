import dynamic from 'next/dynamic'
import CausticOverlay from '@/components/scenes/caustic/CausticOverlay'

// const CausticScene = dynamic(() => import('@/components/scenes/caustic/CausticScene'), {
//   ssr: false,
// })
const MonitorsScene = dynamic(() => import('@/components/scenes/monitors/MonitorsScene'), {
  ssr: false,
})

export function Hero() {
  return (
    <>
      <MonitorsScene />
      {/* <CausticOverlay /> */}
    </>
  )
}
