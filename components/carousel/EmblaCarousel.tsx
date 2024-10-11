'use client'

import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { useParallax } from './useParallax'

type PropType = {
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<React.PropsWithChildren<PropType>> = (props) => {
  console.log('inspect.props', props.options)
  const { children, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  useParallax(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  // cảnh báo nếu số lượng dot không đúng với số lượng scroll snap
  // ví dụ carousel có 2 slide, 1 scroll snap, thì sẽ cảnh báo. Lúc đó nó chỉ hiện 1 dot
  useEffect(() => {
    if (!emblaApi) return
    const nodes = emblaApi.slideNodes()
    if (nodes.length !== scrollSnaps.length) {
      console.warn(
        `Warning: number of slides does not match number of scroll snaps\n` +
          `Slides: ${nodes.length}\n` +
          `Scroll Snaps: ${scrollSnaps.length}\n` +
          (nodes.length > scrollSnaps.length ? `There should be ${nodes.length} node(s)` : '')
      )
    }
  }, [emblaApi, scrollSnaps.length])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
