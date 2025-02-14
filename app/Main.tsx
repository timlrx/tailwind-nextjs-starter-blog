import clsx from 'clsx/lite'
import Image from 'next/image'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import type { PaginationProps } from '@/components/Pagination'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

interface HomeProps {
  posts: CoreContent<Blog>[]
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination: PaginationProps
}

export default function Home({ posts, pagination, initialDisplayPosts = [] }: HomeProps) {
  const currentPageNumber = pagination.currentPage
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="divide-y divide-gray-200 md:mt-10 md:divide-y-0 dark:divide-gray-700">
        <div className="md:border-opacity-60 space-y-2 pt-6 pb-8 md:space-y-0 md:rounded-md md:border-2 md:border-gray-200 md:p-0 md:dark:border-gray-700">
          <h1 className="md:border-opacity-60 text-3xl leading-9 font-extrabold tracking-tight text-gray-900 capitalize sm:text-4xl sm:leading-10 md:border-b-2 md:border-gray-200 md:p-[1.5rem] md:text-5xl md:leading-12 dark:text-gray-100 md:dark:border-gray-700">
            {currentPageNumber < 2 ? (
              <span>Latest</span>
            ) : (
              <span>All posts - section {currentPageNumber}</span>
            )}
          </h1>
          <p className="text-lg leading-7 text-gray-500 md:p-[0.875rem] dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 md:divide-y-0 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {displayPosts.map((post, index) => {
            const { path, slug, date, coverImage, title, summary, tags } = post
            const { url, alt, width, height, home } = coverImage ?? {}
            const { parentClass, childClass, parentStyle, childStyle } = home ?? {}
            const isSquare = width && height ? width === height : false
            const isVertical = width && height ? width < height : false
            const hasImageWidthClassMd = childClass?.includes('md:w-')

            return (
              <li key={path} className="py-12 last:pb-0 md:mt-12 md:py-0">
                <article className="md:border-opacity-60 grid md:grid-cols-7 md:overflow-hidden md:rounded-md md:border-2 md:border-gray-200 xl:grid-cols-8 md:dark:border-gray-700">
                  <dl
                    className={clsx(
                      'md:col-end-8 md:row-start-1 md:grid md:items-center md:p-3 xl:border-r-2 xl:border-inherit',
                      url ? 'xl:row-end-2' : 'xl:row-end-5',
                      isSquare || isVertical
                        ? 'md:col-start-3 md:border-l-2 md:border-inherit xl:col-start-3 xl:col-end-9 xl:border-none xl:pl-4'
                        : 'md:col-start-1 xl:col-end-3 xl:text-center'
                    )}
                  >
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  {url && (
                    <Link
                      href={`/blog/${slug}`}
                      className={clsx(
                        'relative mt-4 grid md:col-start-1 md:col-end-3 md:mt-0 md:items-center md:justify-center md:border-inherit xl:row-end-5 xl:h-full xl:border-r-2 xl:border-b-0',
                        parentClass,
                        isSquare
                          ? 'md:row-end-4 md:border-b-0 xl:row-start-1 xl:border-t-0'
                          : 'md:row-end-3',
                        isVertical
                          ? 'md:row-start-1 md:row-end-5 md:border-y-0 xl:aspect-[10/12]'
                          : 'md:row-start-2 md:border-y-2'
                      )}
                      style={parentStyle}
                    >
                      <Image
                        src={url}
                        alt={alt ?? ''}
                        width={width}
                        height={height}
                        className={clsx('pr-4 md:px-2', childClass, {
                          'md:w-[1000px]': !hasImageWidthClassMd,
                        })}
                        style={childStyle}
                      />
                    </Link>
                  )}
                  <div
                    className={clsx(
                      'mt-4 md:row-start-2 md:mt-0 md:border-2 md:border-r-0 md:border-inherit md:p-4 xl:row-end-2 xl:border-none xl:pb-0',
                      url
                        ? 'md:col-start-3 md:col-end-8 xl:col-end-9'
                        : 'md:col-start-1 md:col-end-8 md:border-l-0 xl:col-start-3 xl:col-end-9',
                      isSquare || isVertical
                        ? 'md:border-b-0 md:pb-0 xl:row-start-2'
                        : 'xl:row-start-1'
                    )}
                  >
                    <h2 className="text-2xl leading-8 font-bold tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      'prose mt-6 max-w-none border-inherit text-gray-500 md:col-end-8 md:row-start-3 md:mt-0 md:p-4 xl:col-start-3 xl:col-end-9 xl:row-start-2 xl:row-end-4 dark:text-gray-400',
                      isSquare || isVertical
                        ? 'md:col-start-3 md:border-l-2 xl:row-start-3 xl:border-l-0'
                        : 'md:col-start-1'
                    )}
                  >
                    {summary}
                  </div>
                  <div
                    className={clsx(
                      'mt-6 flex justify-between text-base leading-6 font-medium md:col-end-8 md:row-start-4 md:mt-0 md:border-t-2 md:border-inherit xl:col-start-3 xl:col-end-9 xl:mt-auto',
                      isVertical ? 'md:col-start-3 md:border-l-2 xl:border-l-0' : 'md:col-start-1'
                    )}
                  >
                    <Link
                      href={`/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 md:hover:bg-primary-500 md:hover:text-primary-100 md:dark:hover:text-primary-950 md:w-full md:items-center md:p-[0.75rem] md:text-center"
                      aria-label={`Read more: "${title}"`}
                    >
                      Read more <span className="md:hidden">&rarr;</span>
                    </Link>
                    {index + 1 === initialDisplayPosts.length && (
                      <Link
                        href="/blog"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 md:hidden"
                        aria-label="All posts"
                      >
                        All Posts &rarr;
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mt-10 grid items-center md:grid-cols-2 xl:grid-cols-3">
        <div className="col-start-1 col-end-2">
          {pagination && pagination.totalPages && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
        {posts.length > initialDisplayPosts.length && (
          <div className="hidden justify-end text-base leading-6 font-medium md:col-start-2 md:col-end-3 md:flex xl:col-start-3 xl:col-end-4">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>
      {siteMetadata.newsletter?.provider && (
        <div className="mt-10 flex items-center justify-center print:hidden">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
