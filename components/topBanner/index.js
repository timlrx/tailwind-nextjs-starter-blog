import { ArrowSmallRightIcon } from "@heroicons/react/24/solid"
// import { usePostHog } from "posthog-js/react"

import SlackLogo from "../slackLogo"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function TopBanner() {
  const [text, setText] = useState("Never wait for a code review again")
  const [isVisible, setIsVisible] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <div
      className={`relative ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-700"} ${
        isVisible ? "opacity-100 transition-opacity duration-500" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="sm:px-16 sm:text-center md:pr-16">
          <p className="font-medium ">
            <a
              href="https://axolo.co"
              rel="noopener noreferrer"
              target="_blank"
              className=" flex place-content-center place-items-center"
            >
              {/* <SlackLogo /> */}
              {/* mobile text */}
              <span className="sm:hidden">{text}</span>
              {/* desktop text */}
              <span className="hidden sm:inline">{text}</span>
              <span
                className="rainbow-button ml-1 inline-flex cursor-pointer items-center font-bold"
                onClick={(e) => {
                  e.stopPropagation() // Prevents the anchor click
                  // Add any additional functionality here if needed
                }}
              >
                with Axolo
                <ArrowSmallRightIcon className="ml-2 h-4 w-4 animate-bounce-h" />
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
