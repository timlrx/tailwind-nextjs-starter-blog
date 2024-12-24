'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export interface PaginationProps {
  currentPage: number
  totalPages: number
}

const getPaginationBasePath = (pathname: string): string => {
  const [_, segment] = pathname.split('/')

  if (['', 'page'].includes(segment)) {
    return ''
  }

  return `/${segment}`
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname()
  const basePath = getPaginationBasePath(pathname)
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `${basePath}/` : `${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
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
          <Link href={`${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Pagination
