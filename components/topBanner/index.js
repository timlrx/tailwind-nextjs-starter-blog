import { ArrowSmallRightIcon } from "@heroicons/react/24/solid"

export default function TopBanner() {
  return (
    <div className="relative bg-primaryBlue">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center ">
          <p className="font-medium text-white">
            <>
              {/* mobile text */}
              <span className="sm:hidden">Big news! Today, we launch the</span>
              {/* desktop text */}
              <span className="hidden sm:inline">Big news! Today, we launch the</span>
              <span className="rainbow-button">
                <a
                  href="https://www.producthunt.com/posts/gitlab-integration-marketplace"
                  className="inline-flex items-center font-bold text-white"
                  rel="noopener nofollow noreferrer"
                  target="_blank"
                >
                  GitLab Integration Marketplace
                  <ArrowSmallRightIcon className="ml-2 h-4 w-4 animate-bounce-h" />
                </a>
              </span>
            </>
          </p>
        </div>
        {/* button to disbale the banner */}
        {/* <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
          <button
            type="button"
            className="flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div> */}
      </div>
    </div>
  )
}
