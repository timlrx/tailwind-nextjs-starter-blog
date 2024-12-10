import { useEffect, useRef, useState } from 'react'

export const useScrollspy = (
  ids: string[],
  options: IntersectionObserverInit
): string | undefined => {
  const [activeId, setActiveId] = useState<string>()
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = ids.map((id) => document.querySelector(`${id}`))

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }, options)

    for (const el of elements) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el && observer.current.observe(el)
    }

    return () => observer.current?.disconnect()
  }, [ids, options])

  return activeId
}
