'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlayCircleIcon } from '@heroicons/react/24/solid'

const ToggleGif = ({ gifSrc, staticSrc, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Indicate that we're now in the browser environment
    setIsClient(true)
  }, [])

  const toggleGif = () => {
    if (isClient) {
      setIsPlaying(!isPlaying)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleGif()
    }
  }

  return (
    <div
      onClick={toggleGif}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      className="relative h-full w-full cursor-pointer"
      onMouseEnter={() => !isPlaying && setIsPlaying(false)}
      aria-label="Toggle GIF"
    >
      {!isPlaying ? (
        <>
          <Image src={staticSrc} alt={alt} layout="responsive" width={16} height={9} />
          <PlayCircleIcon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform text-teal-500 opacity-75" />
        </>
      ) : (
        <img src={gifSrc} alt={alt} className="h-full w-full" />
      )}
    </div>
  )
}

export default ToggleGif
