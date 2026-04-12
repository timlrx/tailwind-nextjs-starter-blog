'use client'

import { create } from 'zustand'

type CanvasApi = {
  isPaused: boolean
  isLoaded: boolean
  pause: () => void
  play: () => void
  reset: () => void
  onPauseCallbacks: (() => void)[]
  onPlayCallbacks: (() => void)[]
  onPause: (callback: () => void) => () => void
  onPlay: (callback: () => void) => () => void
  setIsLoaded: (isLoaded: boolean) => void
}

export const useCanvasApi = create<CanvasApi>((set, get) => ({
  isPaused: true,
  isLoaded: false,
  onPauseCallbacks: [],
  onPlayCallbacks: [],
  onPause: (callback) => {
    set((state) => ({ onPauseCallbacks: [...state.onPauseCallbacks, callback] }))
    return () =>
      set((state) => ({
        onPauseCallbacks: state.onPauseCallbacks.filter((fn) => fn !== callback),
      }))
  },
  onPlay: (callback) => {
    set((state) => ({ onPlayCallbacks: [...state.onPlayCallbacks, callback] }))
    return () =>
      set((state) => ({
        onPlayCallbacks: state.onPlayCallbacks.filter((fn) => fn !== callback),
      }))
  },
  pause: () => {
    set({ isPaused: true })
    const onPause = get().onPauseCallbacks
    onPause.forEach((fn) => fn())
  },
  play: () => {
    set({ isPaused: false })
    const onPlay = get().onPlayCallbacks
    onPlay.forEach((fn) => fn())
  },
  reset: () => set({ isPaused: true, isLoaded: false }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}))
