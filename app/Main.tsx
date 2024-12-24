import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import type { PaginationProps } from '@/components/Pagination'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PostImage from '@/components/PostImage'
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
      <div className="divide-y divide-gray-200 dark:divide-gray-700 md:mt-10 md:divide-y-0">
        <div className="space-y-2 pb-8 pt-6 md:space-y-0 md:rounded-md md:border-2 md:border-gray-200 md:border-opacity-60 md:p-0 md:dark:border-gray-700">
          <h1 className="text-3xl font-extrabold capitalize leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-b-2 md:border-gray-200 md:border-opacity-60 md:p-[1.5rem] md:text-5xl md:leading-12 md:dark:border-gray-700">
            {currentPageNumber < 2 ? (
              <span>Latest</span>
            ) : (
              <span>All posts - section {currentPageNumber}</span>
            )}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 md:p-[0.875rem]">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 md:divide-y-0">
          {!posts.length && 'No posts found.'}
          {displayPosts.map((post, index) => {
            const { path, slug, date, images, title, summary, tags } = post
            const postImageSrc = images && images[0] ? images[0] : null
            return (
              <li key={path} className="py-12 last:pb-0 md:mt-12 md:py-0">
                <article className="grid md:overflow-hidden md:rounded-md md:border-2 md:border-gray-200 md:border-opacity-60 md:dark:border-gray-700 xl:grid-cols-4">
                  <dl
                    className={`md:col-start-1 md:col-end-4 md:row-start-1 md:grid md:items-center md:p-[0.75rem] xl:col-end-2 xl:border-r-2 xl:border-gray-200 xl:border-opacity-60 xl:text-center xl:dark:border-gray-700
                    ${!postImageSrc ? 'xl:row-end-5' : ''}`}
                  >
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  {postImageSrc && (
                    <Link
                      href={`/blog/${slug}`}
                      className="mt-4 grid md:col-start-1 md:col-end-2 md:row-start-2 md:mt-0 md:items-center md:justify-center md:border-y-2 md:border-r-2 md:border-gray-200 md:border-opacity-60 md:p-2 md:dark:border-gray-700 xl:row-end-5 xl:border-b-0"
                    >
                      <PostImage
                        src={postImageSrc}
                        alt=""
                        height={162}
                        width={216}
                        xl={{ height: 246, width: 328 }}
                      />
                    </Link>
                  )}
                  <div
                    className={`mt-4 md:row-start-2 md:mt-0 md:border-y-2 md:border-gray-200 md:border-opacity-60 md:p-4 md:dark:border-gray-700 xl:col-start-2 xl:col-end-5 xl:row-start-1 xl:row-end-2 xl:border-none xl:pb-0
                      ${postImageSrc ? 'md:col-start-2 md:col-end-4' : 'md:col-start-1 md:col-end-4'}`}
                  >
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
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
                  <div className="prose mt-6 max-w-none text-gray-500 dark:text-gray-400 md:col-start-1 md:col-end-4 md:row-start-3 md:mt-0 md:p-4 xl:col-start-2 xl:col-end-5 xl:row-start-2 xl:row-end-4">
                    {summary}
                  </div>
                  <div className="mt-6 flex justify-between text-base font-medium leading-6 md:col-start-1 md:col-end-4 md:row-start-4 md:mt-0 md:border-t-2 md:border-gray-200 md:border-opacity-60 md:dark:border-gray-700 xl:col-start-2 xl:col-end-5">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 md:w-full md:items-center md:p-[0.75rem] md:text-center md:hover:bg-primary-500 md:hover:text-primary-100 md:dark:hover:text-primary-950"
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
          <div className="hidden justify-end text-base font-medium leading-6 md:col-start-2 md:col-end-3 md:flex xl:col-start-3 xl:col-end-4">
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
