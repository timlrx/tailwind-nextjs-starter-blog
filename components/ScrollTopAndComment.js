import siteMetadata from "@/data/siteMetadata"
import { useEffect, useState } from "react"
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener("scroll", handleWindowScroll)
    return () => window.removeEventListener("scroll", handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById("comment").scrollIntoView()
  }

  let url
  if (typeof window !== "undefined") {
    url = `https://axolo.co${window?.location?.pathname}`
  }
  return (
    <div
      className={`fixed right-8 bottom-8 mb-[60px] hidden flex-col items-center gap-3 ${
        show ? "md:flex" : "md:hidden"
      }`}
    >
      {/* https://github.com/nygardk/react-share#readme */}
      {/* disabledStyle  */}

      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} iconFillColor="grey" bgStyle={{ fill: "none" }} />

      </TwitterShareButton>


      <RedditShareButton url={url}>

        <RedditIcon size={32} round={true} iconFillColor="grey" bgStyle={{ fill: "none" }} />

      </RedditShareButton>


      <LinkedinShareButton url={url}>

        <LinkedinIcon size={32} round={true} iconFillColor="grey" bgStyle={{ fill: "none" }} />

      </LinkedinShareButton>


      <FacebookShareButton url={url}>

        <FacebookIcon size={32} round={true} iconFillColor="grey" bgStyle={{ fill: "none" }} />

      </FacebookShareButton>

      {siteMetadata.comment.provider && (
        <button
          aria-label="Scroll To Comment"
          type="button"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default ScrollTopAndComment
