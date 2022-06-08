const data = {
  try: {
    firstText: "Axolo is a Slack app to help tech",
    secondText: "teams review pull request seamlessly",
    link: "https://api.axolo.co/identify/slack",
    textButton: "Try for free",
  },
  learn: {
    firstText: "Enable your team to merge",
    secondText: "pull requests faster with Axolo",
    link: "https://axolo.co",
    textButton: "Learn more",
  },
  productivity: {
    firstText: "Help your team be more productive",
    secondText: "with Axolo.",
    link: "https://axolo.co",
    textButton: "Learn more",
  },
}

function CTABanner({ type }) {
  const element = data[`${type}`]
  return (
    <div className="my-4">
      <div
        className="max-w-7xl   rounded-xl
      bg-gray-100 dark:bg-gray-800 md:flex
       md:items-center md:justify-between md:px-4"
      >
        <h2 className="px-4 pt-4 md:px-0 md:pt-0 md:pb-4">
          <span className="block text-xl text-secondaryBlack dark:text-textWhite sm:text-2xl">
            {element.firstText}
          </span>
          <span className="block text-xl text-primaryBlue sm:text-2xl">{element.secondText}</span>
        </h2>
        <div className="mt-0 flex flex-shrink-0 pb-4 sm:pl-4 md:pl-0 md:pb-0">
          <a
            href={element.link}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sans inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primaryBlue px-5 py-3 font-medium  hover:bg-secondaryBlue sm:w-auto"
          >
            <div className="inline-flex text-textWhite">{element.textButton}</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CTABanner
