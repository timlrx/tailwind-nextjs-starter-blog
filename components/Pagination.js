import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <nav className="flex justify-between">
      {!prevPage && (
        <button rel="previous" className="cursor-auto">
          <strike>Previous</strike>
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
        <button rel="next" className="cursor-auto">
          <strike>Next</strike>
        </button>
      )}
      {nextPage && (
        <Link href={`/blog/page/${currentPage + 1}`}>
          <button rel="next">Next</button>
        </Link>
      )}
    </nav>
  )
}
