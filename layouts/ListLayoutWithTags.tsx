'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import clsx from 'clsx'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title?: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
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
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        {title && (
          <div className="pb-6 pt-6">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
          </div>
        )}
        <div className=" flex space-x-0 sm:space-x-12 xl:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="w-full py-4 pl-6">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="py-2 pl-3 pr-1 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <ListLayoutBase posts={displayPosts} pagination={pagination} />
        </div>
      </div>
    </>
  )
}

interface ListLayoutBaseProps extends ListLayoutProps {
  readMore?: boolean
  dateToSide?: boolean
}

export function ListLayoutBase({
  posts,
  pagination,
  readMore = false,
  dateToSide = false,
}: ListLayoutBaseProps) {
  return (
    <div className="w-full">
      <ul>
        {posts.map((post) => {
          const { path, date, title, summary, tags } = post
          return (
            <li key={path} className="py-3">
              <article>
                <div
                  className={clsx({
                    'space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0':
                      dateToSide === true,
                    'pointer mb-1 flex flex-col space-y-2 transition-colors xl:space-y-0':
                      dateToSide === false,
                  })}
                >
                  {dateToSide && (
                    <dl className="hidden xl:block">
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                  )}
                  <div className={clsx({ 'space-y-5 xl:col-span-3': dateToSide === true })}>
                    <Link className="group" href={`/${path}`}>
                      <div className="mb-2 rounded-lg border border-transparent p-2 group-hover:border-primary-400 group-hover:bg-primary-100 dark:hover:bg-primary-900">
                        <dl className={clsx({ 'block xl:hidden': dateToSide, block: !dateToSide })}>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </dd>
                        </dl>

                        <div>
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <p className="text-gray-900 dark:text-gray-100">{title}</p>
                            </h2>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                          {readMore && (
                            <div className="text-base font-medium leading-6">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                                aria-label={`Read more: "${title}"`}
                              >
                                Read more &rarr;
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-row flex-wrap gap-1">
                      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
