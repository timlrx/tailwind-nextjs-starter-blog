'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
          <Image src={staticSrc} alt={alt} layout="responsive" width={16} height={9}/>
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

const ClientToggleGif = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once we know we're in the browser
    setIsClient(true);
  }, []);

  // Only render the ToggleGif component on the client-side
  return isClient ? <ToggleGif {...props} /> : null;
};

export default ClientToggleGif;
