import React from "react"
import ReviewStars from "./starRating"

const ReviewCard = ({ testimonial }) => {
  return (
    // ReviewStars
    <div className="m-4  rounded-lg  border border-gray-200 bg-white p-6 shadow-md dark:border-gray-600   dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between ">
        <div className=" flex items-center ">
          <img
            className="my-0 mr-2 h-10 w-10 rounded-full"
            src={testimonial?.image}
            alt={testimonial?.name}
          />
          {testimonial?.name}
        </div>
        <div className="">
          <ReviewStars />
        </div>
      </div>
      <p className="mb-4 mt-0 text-sm text-gray-700 dark:text-gray-400">{testimonial.text}</p>
      <div className="flex justify-end">
        <a href="#" className="text-xs text-blue-500 hover:underline">
          Read more Axolo reviews -{">"}
        </a>
      </div>
    </div>
  )
}

export default ReviewCard
