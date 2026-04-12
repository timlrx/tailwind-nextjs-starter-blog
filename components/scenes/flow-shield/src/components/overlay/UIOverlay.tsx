'use client'

import OverlayHeader from './OverlayHeader'

export default function UIOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <OverlayHeader />
    </div>
  )
}
