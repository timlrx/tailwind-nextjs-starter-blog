import { ArrowSmallRightIcon } from "@heroicons/react/24/solid"
import SlackLogo from "../slackLogo"

export default function TopBanner() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-gray-700 sm:px-16 sm:text-center md:pr-16">
          <p className="font-medium ">
            <a
              href="https://api.axolo.co/identify/slack"
              rel="noopener noreferrer"
              target="_blank"
              className=" flex place-content-center place-items-center"
            >
              <SlackLogo />
              {/* mobile text */}
              <span className="sm:hidden">
                Review pull requests in Slack with a two weeks free trial on Axolo
              </span>
              {/* desktop text */}
              <span className="hidden sm:inline">
                Review pull requests in Slack with a two weeks free trial on
              </span>
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
