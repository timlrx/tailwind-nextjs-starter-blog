'use client'

import { useMediaQuery } from 'hooks/use-media-query'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PostImageProps {
  src: string
  alt: string
  height: number
  width: number
  md?: { height: number; width: number }
  xl?: { height: number; width: number }
}

function PostImage({ src, alt, height, width, md, xl }: PostImageProps) {
  const [imageHeight, setImageHeight] = useState(height)
  const [imageWidth, setImageWidth] = useState(width)

  const isMd = useMediaQuery('screen and (min-width: 768px)')
  const isXl = useMediaQuery('screen and (min-width: 1280px)')

  useEffect(() => {
    if (isXl && xl) {
      setImageHeight(xl.height)
      setImageWidth(xl.width)
      return
    }
    if (isMd && md) {
      setImageHeight(md.height)
      setImageWidth(md.width)
      return
    }
    setImageHeight(height)
    setImageWidth(width)
  }, [isMd, isXl])

  return <Image src={src} alt={alt} height={imageHeight} width={imageWidth} />
}

export default PostImage
