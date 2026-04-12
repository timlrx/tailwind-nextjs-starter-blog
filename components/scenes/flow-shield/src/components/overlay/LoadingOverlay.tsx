'use client'

import styles from './LoadingOverlay.module.css'

interface LoadingOverlayProps {
  visible: boolean
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <span className={styles.text}>Loading Model...</span>
      </div>
    </div>
  )
}
