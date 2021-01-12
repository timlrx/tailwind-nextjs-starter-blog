export default function FourZeroFour() {
  return (
    <div className="flex items-start justify-start flex-col md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24">
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="text-6xl leading-9 font-extrabold text-gray-900 dark:text-gray-100 tracking-tight md:text-8xl md:leading-14 md:border-r-2 md:px-6">
          404
        </h1>
      </div>
      <div class="max-w-md">
        <p class="text-xl md:text-2xl mb-4 font-bold leading-normal">
          Sorry we couldn't find this page.
        </p>
        <p class="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

        <button class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500">
          Back to Homepage
        </button>
      </div>
    </div>
  )
}
