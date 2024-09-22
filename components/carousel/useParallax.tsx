import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { useRef, useCallback, useEffect } from 'react'

const TWEEN_FACTOR_BASE = 0.2

export function useParallax(emblaApi?: EmblaCarouselType) {
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])
  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    const slides = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
    })

    tweenNodes.current = slides
  }, [])
  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100
        const tweenNode = tweenNodes.current[slideIndex]
        tweenNode.style.transform = `translateX(${translate}%)`
      })
    })
  }, [])
  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)

    return () => {
      emblaApi
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenParallax)
        .off('scroll', tweenParallax)
        .off('slideFocus', tweenParallax)
    }
  }, [emblaApi, setTweenFactor, setTweenNodes, tweenParallax])
}
