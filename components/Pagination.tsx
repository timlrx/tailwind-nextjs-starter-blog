import Link from '@/components/Link'

interface Props {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex items-center justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button className="rounded-lg border border-gray-900 p-2 transition duration-500 ease-in-out hover:border-primary-500 hover:bg-primary-500 hover:text-gray-100 dark:border-gray-100 dark:hover:border-primary-500">
              Previous
            </button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto  disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button className="rounded-lg border border-gray-900 p-2 transition duration-500 ease-in-out hover:border-primary-500 hover:bg-primary-500 hover:text-gray-100 dark:border-gray-100 dark:hover:border-primary-500">
              Next
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
