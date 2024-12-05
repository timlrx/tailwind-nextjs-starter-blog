import React from "react"

export const EndBannerCTA = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 pb-8  lg:pb-16 ">
        <div className=" border-t border-gray-200 pt-8 dark:border-gray-700 lg:flex lg:items-center  lg:justify-between lg:pt-16">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl ">
            <span className="block text-black dark:text-white">Streamline your code reviews</span>
            <span className="block text-primaryBlue">Jump directly to sign up for free.</span>
          </h2>
          <div className="mt-8  flex lg:mt-0 lg:flex-shrink-0">
            <div className="mr-4 inline-flex  rounded-md shadow">
              <a
                href="https://api.axolo.co/identify/slack"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primaryBlue px-5 py-3 text-base font-medium text-white hover:bg-secondaryBlue"
              >
                Sign up
              </a>
            </div>
            <div className=" inline-flex rounded-md shadow ">
              <a
                href="https://axolo.co/features"
                className="inline-flex items-center justify-center rounded-md  border border-primaryBlue border-transparent bg-white px-5 py-3 text-base font-medium text-primaryBlue hover:bg-gray-100 dark:bg-gray-800"
              >
                See all features
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
