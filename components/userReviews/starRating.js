import { StarIcon } from "@heroicons/react/24/solid"

export default function ReviewStars() {
  const length = 5
  return (
    <div className="flex justify-center">
      {Array(length)
        .fill(null)
        .map((element, i) => {
          return (
            <div className="" key={i}>
              {" "}
              <StarIcon className="!tw-transform !fill-warning mr-1 inline-block w-5 transform !text-yellow-400 transition-transform duration-200 ease-out hover:scale-125" />
            </div>
          )
        })}
    </div>
  )
}
