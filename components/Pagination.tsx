import Link from '@/components/Link'

interface Props {
  totalPages: string
  currentPage: string
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              parseInt(currentPage) - 1 === 1 ? `/blog/` : `/blog/page/${parseInt(currentPage) - 1}`
            }
          >
            <button>Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
