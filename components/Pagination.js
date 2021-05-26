import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button rel="previous">Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button rel="next">Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
