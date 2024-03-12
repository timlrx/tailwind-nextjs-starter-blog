'use client'
import siteMetadata from '@/data/siteMetadata'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

const Map = () => {
  const defaultLongitude = 15.691069
  const defaultLatitude = 51.801953
  const supported = mapboxgl.supported()

  const mapContainer = useRef<any>(null)
  const map = useRef<any>(null)
  const [lng, setLng] = useState(defaultLongitude)
  const [lat, setLat] = useState(defaultLatitude)
  const [zoom, setZoom] = useState(16)
  const marker = useRef<any>(null)
  const { resolvedTheme } = useTheme()

  mapboxgl.accessToken = siteMetadata.mapboxToken

  useEffect(() => {
    if (!supported) {
      return
    }

    const mapTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

    if (map && map.current) {
      return // initialize map only once
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapTheme}-v11`,
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })

    marker.current = new mapboxgl.Marker()
      .setLngLat([defaultLongitude, defaultLatitude])
      .addTo(map.current)
  })

  useEffect(() => {
    if (map.current && marker.current && supported) {
      const mapTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

      map.current.setStyle(`mapbox://styles/mapbox/${mapTheme}-v11`)

      const element = marker.current.getElement()
      const svg = element.getElementsByTagName('svg')[0]
      const path = svg.getElementsByTagName('path')[0]
      path.setAttribute('fill', mapTheme === 'dark' ? 'white' : 'black')
      const circle = svg.getElementsByTagName('circle')[0]
      circle.setAttribute('fill', mapTheme === 'dark' ? 'white' : 'black')
    }
  }, [resolvedTheme])

  return supported ? (
    <div className={'my-4'}>
      <div ref={mapContainer} className={'h-[400px]'} />
    </div>
  ) : null
}

export default Map
