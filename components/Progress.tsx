const Skill = ({ percent, name }) => (
  <div className="flex flex-grow flex-col content-stretch items-center justify-center">
    <p className="my-2 text-center text-2xl font-bold text-gray-800 dark:text-white">{name}</p>
    <div className="relative h-24 w-24">
      <svg
        className="h-full w-full"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-gray-700"
          strokeWidth="2"
        />
        <g className="origin-center -rotate-90 transform animate-spin">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-primary-500 dark:text-primary-400"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={`${100 - percent}`}
          />
        </g>
      </svg>
      <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {percent}%
        </span>
      </div>
    </div>
  </div>
)

export default Skill
