'use client'
// components/ToggleGif.tsx
import React, { useState } from 'react';
import { PlayCircleIcon, PlayIcon, PlayPauseIcon } from '@heroicons/react/24/solid';

const ToggleGif = ({ gifSrc, staticSrc, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleGif = () => {
    setIsPlaying(!isPlaying);
  };

  
  return (
    <div 
      onClick={toggleGif} 
      className="relative w-full h-full cursor-pointer"
      onMouseEnter={() => !isPlaying && setIsPlaying(false)}
    >
      {!isPlaying ? (
        <>
          <img src={staticSrc} alt={alt} className="w-full h-full" />
          <PlayCircleIcon
            className="absolute top-1/2 left-1/2 w-12 h-12 text-teal-500 opacity-75 transform -translate-x-1/2 -translate-y-1/2"
          />
        </>
      ) : ( 
        <img src={gifSrc} alt={alt} className="w-full h-full" />
      )}
    </div> 
  );
};

export default function ClientToggleGif(props) {
  if (typeof window !== 'undefined') {
    return <ToggleGif {...props} />;
  }
  return null;
}