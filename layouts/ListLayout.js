import Link from '@/components/Link'
import Tag, { TagList } from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + (frontMatter.tags || []).join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      {/* Hero Section */}
      <div className="section-breathe">
        <h1 className="mb-4 text-4xl font-semibold text-text-primary md:text-5xl">{title}</h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          Insights on software development, AI, and technology.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-lg">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles..."
          className="border-border-default block w-full rounded-lg border bg-surface-elevated px-4 py-3 text-text-primary placeholder-text-muted focus:border-border-accent focus:outline-none focus:ring-2 focus:ring-border-accent"
        />
        <svg
          className="absolute right-4 top-3.5 h-5 w-5 text-text-muted"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Blog Grid - Japanese Minimalism: no cards, asymmetric dividers */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {!filteredBlogPosts.length && (
          <p className="col-span-full text-center text-text-secondary">No posts found.</p>
        )}
        {displayPosts.map((frontMatter) => {
          const { slug, date, title, summary, tags } = frontMatter
          return (
            <article key={slug} className="group divider-asymmetric relative pb-8">
              {/* Tags */}
              <div className="mb-3">
                <TagList tags={tags} limit={2} />
              </div>

              {/* Title */}
              <h2 className="mb-2 text-xl font-semibold text-text-primary transition-colors group-hover:text-accent-subtle">
                <Link href={`/blog/${slug}`}>{title}</Link>
              </h2>

              {/* Summary */}
              <p className="line-clamp-2 mb-4 flex-1 text-sm text-text-secondary">{summary}</p>

              {/* Date */}
              <time className="text-sm text-text-muted" dateTime={date}>
                {formatDate(date)}
              </time>
            </article>
          )
        })}
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <div className="mt-12">
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        </div>
      )}
    </>
  )
}
