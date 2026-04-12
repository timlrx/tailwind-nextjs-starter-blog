'use client'

import { useRef } from 'react'
import { COLORS } from '../theme/theme'
import styles from './OverlayButtons.module.css'
import type { Preset } from '../../types'

interface OverlayButtonsProps {
  showGrid: boolean
  onToggleGrid: () => void
  hideLeva: boolean
  onToggleLeva: () => void
  hasGlb: boolean
  onLoadGlb: (file: File) => void
  onClearGlb: () => void
  preset: Preset
  onSetPreset: (p: Preset) => void
}

export default function OverlayButtons({
  showGrid,
  onToggleGrid,
  hideLeva,
  onToggleLeva,
  hasGlb,
  onLoadGlb,
  onClearGlb,
  preset,
  onSetPreset,
}: OverlayButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onLoadGlb(file)
    e.target.value = ''
  }

  return (
    <div
      className={styles.container}
      style={
        {
          '--overlay-bg': COLORS.bg,
          '--overlay-surface': COLORS.surface,
          '--overlay-border': COLORS.border,
          '--overlay-text': COLORS.text,
          '--overlay-accent': COLORS.accent,
        } as React.CSSProperties
      }
    >
      {/* Preset selector */}
      <div className={styles.presetGroup}>
        <button
          onClick={() => onSetPreset('default')}
          className={`${styles.presetBtn} ${preset === 'default' ? styles.active : styles.inactive}`}
          title="Default preset — sphere shield"
        >
          Default
        </button>
        <button
          onClick={() => onSetPreset('droideka')}
          className={`${styles.presetBtn} ${preset === 'droideka' ? styles.active : styles.inactive}`}
          title="Droideka preset — Star Wars droid"
        >
          Droideka
        </button>
      </div>

      <div className={styles.separator} />

      {/* Load GLB */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        className={styles.fileInput}
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className={`${styles.importBtn} ${hasGlb ? styles.active : ''}`}
        title="Load GLB model"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M8 2v8M5 7l3 3 3-3" />
          <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" />
        </svg>
        <span className={styles.importLabel}>Import GLB</span>
      </button>

      {/* Clear GLB */}
      {hasGlb && (
        <button onClick={onClearGlb} className={styles.btn} title="Remove model (back to sphere)">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}

      {/* Toggle Grid */}
      <button
        onClick={onToggleGrid}
        className={`${styles.btn} ${showGrid ? styles.active : styles.inactive}`}
        title={showGrid ? 'Hide Grid' : 'Show Grid'}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <rect x="1" y="1" width="6" height="6" />
          <rect x="9" y="1" width="6" height="6" />
          <rect x="1" y="9" width="6" height="6" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
      </button>

      {/* Toggle Leva Controls */}
      <button
        onClick={onToggleLeva}
        className={`${styles.btn} ${!hideLeva ? styles.active : styles.inactive}`}
        title={hideLeva ? 'Show Controls' : 'Hide Controls'}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <line x1="2" y1="4" x2="14" y2="4" />
          <circle cx="10" cy="4" r="1.5" fill="currentColor" />
          <line x1="2" y1="8" x2="14" y2="8" />
          <circle cx="5" cy="8" r="1.5" fill="currentColor" />
          <line x1="2" y1="12" x2="14" y2="12" />
          <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </button>
    </div>
  )
}
