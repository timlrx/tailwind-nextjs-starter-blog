'use client'

import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import clsx from 'clsx'
import Pagination from '@/components/Pagination'
import { ListLayoutProps } from '@/layouts/ListLayoutWithTags'

interface ListLayoutBaseProps extends ListLayoutProps {
  readMore?: boolean
  dateToSide?: boolean
  divideY?: boolean
}

export function ListLayoutBase({
  posts,
  pagination,
  readMore = false,
  dateToSide = false,
  divideY = false,
}: ListLayoutBaseProps) {
  return (
    <div className="w-full">
      <ul className={clsx({ 'divide-y divide-gray-200 dark:divide-gray-700': divideY })}>
        {posts.map((post) => {
          const { path, date, title, summary, tags } = post
          return (
            <li key={path} className="py-10">
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
                            <div className="font-medium leading-6 text-primary-500 group-hover:text-primary-300">
                              Read more &rarr;
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

export default ListLayoutBase
