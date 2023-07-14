import Image from "next/image.js"
import ReviewCard from "./reviewCard.js"

const { testimonials } = require("./reviews.js")

export default function UserReview() {
  const rank = Math.floor(Math.random() * (testimonials.length - 3))
  return (
    <div className="m-4 min-w-full justify-center rounded-t-xl border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-900">
      <div className="grid grid-cols-7 gap-4 rounded-t-xl  border-b border-b-gray-200 bg-white p-6 shadow-md dark:border-b-gray-600 dark:bg-gray-900">
        <div className="col-span-4  ">
          <p className="mb-0 text-2xl font-extrabold text-primaryBlue">Axolo User Experiences</p>
          <p className="mt-0 text-sm font-normal">2480+ developers online</p>
        </div>
        <div className="col-span-3  h-auto max-w-[160px] self-center justify-self-end">
          <Image
            src="/blog/static/images/axolo/logo_axolo.png"
            alt="Axolo Logo"
            width={3798 / 5}
            height={840 / 5}
          />
        </div>
      </div>
      <ReviewCard testimonial={testimonials[rank]} />
      <ReviewCard testimonial={testimonials[rank + 1]} />
      <ReviewCard testimonial={testimonials[rank + 2]} />
      <div className="m-4  ">
        <button
          onClick={() => {
            window.open(`https://axolo.co`, "_blank")
          }}
          className="w-full rounded-md bg-primaryBlue px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-hoverPrimary"
        >
          Try Axolo for free
        </button>
      </div>
    </div>
  )
}
