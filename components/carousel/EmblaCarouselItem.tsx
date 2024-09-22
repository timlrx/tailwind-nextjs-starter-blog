export default function EmblaCarouselItem({ slide, alt }: { slide: string; alt: string }) {
  return (
    <div className="embla__slide">
      <div className="embla__parallax">
        <div className="embla__parallax__layer">
          <img className="embla__slide__img" src={slide} alt={alt} />
        </div>
      </div>
    </div>
  )
}
