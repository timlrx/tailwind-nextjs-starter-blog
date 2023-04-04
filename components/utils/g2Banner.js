import Image from "next/image"
import classNames from "./classNames"
import ReviewStars from "./reviewStar"

const G2Banner = ({ isDarkBackground = false }) => {
  return (
    <div className="flex justify-center pt-10 pb-2 sm:pt-6 sm:pb-0">
      <div
        className={classNames(
          "w-max ",
          !isDarkBackground && "!grid !grid-cols-2 !gap-8 sm:!grid-cols-3 sm:!gap-4"
        )}
      >
        <div
          className={classNames(
            "hidden hover:scale-125 sm:!row-start-1",
            !isDarkBackground && "!row-start-2 !block !w-20 !justify-self-end  "
          )}
        >
          <a
            href="https://www.g2.com/products/axolo/reviews"
            rel="nofollow noreferrer"
            target={"_blank"}
          >
            <Image
              width={770}
              height={1000}
              src="https://axolo.s3.eu-west-3.amazonaws.com/communication/partners/g2-highperformer-codereview.png"
              alt="Peer code review - Axolo awarded High Performer Spring 2023"
            />
          </a>
        </div>
        <a
          href="https://www.g2.com/products/axolo/reviews"
          rel="nofollow noreferrer"
          target={"_blank"}
          className="col-span-2 sm:col-span-1"
        >
          <div className="flex justify-center">
            <div
              className={classNames(
                "w-8",
                isDarkBackground && "mb-1 flex w-10 rounded-full bg-white p-1 "
              )}
            >
              <Image
                width={32}
                height={32.8}
                className={classNames(isDarkBackground && "  ")}
                src="/blog/static/images/partners/g2.png"
                alt="Logo G2"
              />
            </div>
          </div>
          <ReviewStars length={5} />

          <div className="flex justify-center text-center text-sm">
            <p
              className={classNames(
                " text-gray-500 underline underline-offset-2",
                isDarkBackground && "!text-textWhite"
              )}
            >
              4.9/5 star review on G2
            </p>
          </div>
        </a>
        <div
          className={classNames(" hidden  hover:scale-125", !isDarkBackground && "!block !w-20 ")}
        >
          <a
            href="https://www.g2.com/products/axolo/reviews"
            rel="nofollow noreferrer"
            target={"_blank"}
          >
            <Image
              width={770}
              height={1000}
              src="https://axolo.s3.eu-west-3.amazonaws.com/communication/partners/g2-highperformer-smallbusiness.png"
              alt="Peer code review - Axolo awarded High Performer Small Business Spring 2023"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default G2Banner
