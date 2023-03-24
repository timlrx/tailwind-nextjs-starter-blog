import { ArrowSmallRightIcon } from "@heroicons/react/24/solid"
import { usePostHog } from "posthog-js/react"

import SlackLogo from "../slackLogo"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function TopBanner() {
  const posthog = usePostHog()

  const [text, setText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const isDark = theme === "dark" || resolvedTheme === "dark"

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      // feature flags should be available at this point
      if (posthog.getFeatureFlag("banner2") === "problem") {
        setText("See how you can reduce your pickup time by 50% with")
      } else if (posthog.getFeatureFlag("banner2") === "solution") {
        setText("Review pull requests in Slack with a two weeks free trial on")
      } else {
        setText("Improve your pickup time with a two weeks free trial on")
      }

      setIsVisible(true) // set the banner to be visible
    })
  }, [])

  return (
    <div
      className={`relative ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-700"} ${
        isVisible ? "opacity-100 transition-opacity duration-500" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="sm:px-16 sm:text-center md:pr-16">
          <p className="font-medium ">
            <a
              onClick={() => posthog.capture("banner click")}
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
              <span>
                <button className="ml-1 inline-flex items-center font-bold ">
                  Axolo
                  <ArrowSmallRightIcon className="ml-2 h-4 w-4 animate-bounce-h" />
                </button>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
