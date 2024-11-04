import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center space-y-8 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="pb-8 pt-6 text-center md:text-left">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md text-center md:text-left">
        <p className="mb-4 text-lg font-bold leading-normal text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          But don’t worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline-block rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}