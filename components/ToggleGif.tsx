'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlayCircleIcon, PlayIcon, PlayPauseIcon } from '@heroicons/react/24/solid'

const ToggleGif = ({ gifSrc, staticSrc, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleGif = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      onClick={toggleGif}
      className="relative h-full w-full cursor-pointer"
      onMouseEnter={() => !isPlaying && setIsPlaying(false)}
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

const ClientToggleGif = (props) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set isClient to true once we know we're in the browser
    setIsClient(true)
  }, [])

  // Only render the ToggleGif component on the client-side
  return isClient ? <ToggleGif {...props} /> : null
}

export default ClientToggleGif
