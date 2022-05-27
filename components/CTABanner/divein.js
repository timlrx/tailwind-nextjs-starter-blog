export default function DiveIn() {
  return (
    <div className="">
      <div className="mx-1 max-w-7xl rounded-xl bg-gray-100 px-6 pt-1 dark:bg-gray-800 sm:mx-4 md:mx-16 md:flex md:items-center md:justify-between md:py-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-secondaryBlack dark:text-textWhite">Ready to dive in?</span>
          <span className="block text-primaryBlue">Try Axolo for free.</span>
        </h2>
        <div className="mt-0 flex flex-shrink-0 pb-8 md:pb-0">
          <a
            href="https://api.axolo.co/identify/slack"
            rel="noopener noreferrer"
            target="_blank"
            className="text-sans inline-flex items-center justify-center rounded-md border border-transparent bg-primaryBlue px-5 py-3  font-medium hover:bg-secondaryBlue"
          >
            <div className="inline-flex text-textWhite">Sign up</div>
          </a>
        </div>
      </div>
    </div>
  )
}
