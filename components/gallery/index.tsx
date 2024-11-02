'use client'

import React, { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css'
import './test.css'
import { GalleryParents, GalleryChild, GalleryContainer } from 'coffee-time-components'
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin'

export default function SimpleGallery(props) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    })
    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
      // Plugins options, for example:
      type: 'auto',
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
    }
  }, [props.galleryID])

  return (
    <GalleryContainer>
      <GalleryParents className="pswp-gallery not-prose" id={props.galleryID}>
        {props.images.map((image, index) => (
          <GalleryChild
            key={props.galleryID + '-' + index}
            largeUrl={image.largeURL}
            thumbnailUrl={image.thumbnailURL}
            width={image.width}
            height={image.height}
            alt={image.alt}
          />
        ))}
      </GalleryParents>
    </GalleryContainer>
  )
}
