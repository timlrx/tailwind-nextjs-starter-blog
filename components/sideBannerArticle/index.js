import Image from "next/image"
import { useEffect, useState } from "react"
import { usePostHog } from "posthog-js/react"
import classNames from "../utils/classNames"

export default function SideBannerForArticle() {
  const posthog = usePostHog()
  const [imgUrl, setImgUrl] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      if (!isVisible) {
        setImgUrl(posthog.getFeatureFlag("sidebanner_blog"))
        setIsVisible(true) // set the banner to be visible
      }
    })
  }, [])

  return (
    <div
      className={classNames(
        isVisible ? "opacity-100 transition-opacity duration-500" : "opacity-0",
        "hidden md:block "
      )}
    >
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          posthog.capture("Click on side banner blog")
          window.open(`https://axolo.co`, "_blank")
        }}
      >
        <Image
          src={
            imgUrl
              ? `/blog/static/images/sideBanners/${imgUrl}.png`
              : "/blog/static/images/sideBanners/reviews.png"
          }
          alt="Review pull requests in Slack to merge code faster - Axolo"
          width={952}
          height={1260}
        />
      </div>
      <div className="mt-4 text-center text-2xl font-bold">
        Awaiting your <br />
        PR reviewer?
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            posthog.capture("Click on button after side banner blog")
            window.open(`https://axolo.co`, "_blank")
          }}
          className="w-full rounded-sm bg-primaryBlue px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-hoverPrimary"
        >
          Start merging faster today
        </button>
      </div>
    </div>
  )
}
