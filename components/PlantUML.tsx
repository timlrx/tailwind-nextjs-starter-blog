'use client'

import { useEffect, useState } from 'react'
import PlantUmlEncoder from 'plantuml-encoder'

interface PlantUMLProps {
  code: string
  dpi?: number
}

const PlantUML = ({ code, dpi = 600 }: PlantUMLProps) => {
  const [url, setUrl] = useState<string>('')
  const [svgUrl, setSvgUrl] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (typeof code === 'string') {
      const resolution = `skinparam dpi ${dpi}`
      const text = `${resolution}\n${code.trim()}`
      const encoded = PlantUmlEncoder.encode(text)
      setUrl(`https://www.plantuml.com/plantuml/img/${encoded}`)
      setSvgUrl(`https://www.plantuml.com/plantuml/svg/${encoded}`)
    }
  }, [code])

  if (!url) {
    return null
  }

  return (
    <div 
      className="plantuml-chart relative mx-auto max-w-4xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={url}
        alt="PlantUML diagram"
        className="mx-auto block w-full rounded-md object-contain"
        style={{ maxHeight: '80vh' }}
      />
      <a
        href={svgUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute right-2 bottom-2 rounded-md bg-white/80 px-2 py-1 text-xs text-gray-600 shadow-sm transition-all duration-200 hover:bg-white hover:text-gray-900 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        View SVG
      </a>
    </div>
  )
}

export default PlantUML
