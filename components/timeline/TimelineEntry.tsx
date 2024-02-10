import Link from '@/components/Link'

const TimelineEntry = ({
  entry,
  children,
}: {
  children?: React.ReactNode
  entry: {
    primaryText: string
    secondaryText: string
    tags?: string[]
    link?: { href: string; text: string }
  }
}) => (
  <div className="flex md:contents">
    <div className="relative col-start-1 col-end-3 mr-10 md:mx-auto">
      <div className="flex h-full w-6 items-center justify-center">
        <div className="pointer-events-none h-full w-1 bg-primary-500 dark:bg-primary-400"></div>
      </div>
      <div className="absolute top-1/4 h-6 w-6 rounded-full bg-primary-500 text-center shadow dark:bg-primary-400">
        <i className="fas fa-check-circle text-white"></i>
      </div>
    </div>
    <div className="animate-move col-start-3 col-end-12 mr-auto w-full rounded-xl p-4">
      <h3 className="mb-1 text-lg font-semibold text-primary-500 dark:text-primary-400">
        {entry.primaryText}
      </h3>
      <p className="text-justify leading-tight text-gray-900 dark:text-gray-100">
        {entry.secondaryText}
      </p>
      {entry.tags && (
        <p className="my-2 flex flex-wrap gap-2">
          {entry.tags.map((tag, index) => (
            <span key={index} className="text-xs text-primary-500 dark:text-primary-400">
              #{tag}
            </span>
          ))}
        </p>
      )}
      {entry.link && (
        <Link
          href={entry.link.href}
          className="text-gray-600 underline hover:text-gray-900 dark:text-gray-100 hover:dark:text-gray-200"
          aria-label={`Link to project ${entry.primaryText}`}
        >
          {entry.link.text}
        </Link>
      )}
      {children}
    </div>
  </div>
)

export default TimelineEntry
