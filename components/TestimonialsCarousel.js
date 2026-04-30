import { useState, useEffect } from 'react'

const testimonials = [
  {
    quote:
      "Sybil Solutions brings a powerful blend of talent, integrity, and genuine curiosity. When they take on a task you can relax, knowing that they'll see it through to completion to the highest standards. I recommend them without a heartbeat's hesitation.",
    author: 'Adrienne',
    role: 'CMO',
    company: 'Gnosis',
  },
  {
    quote:
      'Sybil Solutions are the kind of builders that constantly think multiple steps ahead, identifying issues before they become issues. They take ownership, require no handholding and are a pleasure to work with.',
    author: 'Peter',
    role: 'CEO',
    company: 'NextMeta',
  },
  {
    quote:
      "Working with Sybil Solutions was a pleasure. They delivered a website that met and exceeded our expectations. What impressed me most was their collaborative mindset and ability to work out detailed solutions for complex problems we couldn't solve. Great quality work with very talented and thorough professionals.",
    author: 'Jarrod Frankel',
    role: 'Founder',
    company: 'Pangea',
  },
  {
    quote:
      "Sybil Solutions' unwavering passion is nothing short of contagious. They approach every project with an intensity that inspires everyone around them. Their remarkable ability to transform vision into reality, coupled with their get-it-done attitude, makes them an unstoppable force who consistently deliver exceptional results.",
    author: 'Sayo',
    role: 'Lead Software Developer',
    company: '',
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const testimonial = testimonials[current]

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="divider-asymmetric relative p-8 md:p-12">
        <div className="transition-opacity duration-500" key={current}>
          <blockquote className="mb-6 text-lg text-text-primary md:text-xl">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-inset text-accent-subtle">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-text-primary">{testimonial.author}</div>
              <div className="text-sm text-text-secondary">
                {testimonial.role}
                {testimonial.company && `, ${testimonial.company}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? 'w-6 bg-accent-subtle' : 'bg-border-default w-2'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
