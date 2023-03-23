import { ArrowSmallRightIcon } from "@heroicons/react/24/solid"
import { usePostHog } from "posthog-js/react"

import SlackLogo from "../slackLogo"
import { useEffect, useState } from "react"

export default function TopBanner() {
  const posthog = usePostHog()

  let [text, setText] = useState("")

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      // feature flags should be available at this point
      if (posthog.getFeatureFlag("banner") === "problem") {
        setText("See how you can reduce your pickup time by 50% with")
      } else if (posthog.getFeatureFlag("banner") === "soltion") {
        setText("Review pull requests in Slack with a two weeks free trial on")
      } else {
        setText("Improve your pickup time with a two weeks free trial on")
      }
    })
  }, [])

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-gray-700 sm:px-16 sm:text-center md:pr-16">
          <p className="font-medium ">
            <a
              onClick={posthog.capture("banner click")}
              href="https://api.axolo.co/identify/slack"
              rel="noopener noreferrer"
              target="_blank"
              className=" flex place-content-center place-items-center"
            >
              <SlackLogo />
              {/* mobile text */}
              <span className="sm:hidden">{text}</span>
              {/* desktop text */}
              <span className="hidden sm:inline">{text}</span>
              <span
              // className="rainbow-button"
              >
                <button
                  // href="https://www.producthunt.com/posts/axolo-for-gitlab"
                  className="ml-1 inline-flex items-center font-bold "
                >
                  Axolo
                  <ArrowSmallRightIcon className="ml-2 h-4 w-4 animate-bounce-h" />
                </button>
              </span>
            </a>
          </p>
        </div>
        {/* button to disbale the banner */}
        {/* <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
          <button
            type="button"
            className="flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XiCon className="h-6 w-6 " aria-hidden="true" />
          </button>
        </div> */}
      </div>
    </div>
  )
}
