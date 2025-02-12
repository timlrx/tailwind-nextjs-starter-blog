'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import type { PaginationProps } from '@/components/Pagination'
import Image from 'next/image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
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

  const displayPosts = initialDisplayPosts.length ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
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
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, coverImage, title, summary, tags } = post
                const { url, alt, width, height, blog } = coverImage ?? {}
                const { parentClass, childClass, parentStyle, childStyle } = blog ?? {}
                const isVertical = width && height ? width < height : false
                return (
                  <li key={path} className="py-5">
                    <article className="grid xl:grid-cols-8 xl:gap-x-4">
                      <dl
                        className={`xl:row-start-1 xl:pt-1 ${isVertical ? 'xl:col-start-4 xl:col-end-9' : 'xl:col-start-1 xl:col-end-4'}`}
                      >
                        <dt className="sr-only">Published on</dt>
                        <dd
                          className={`text-base leading-6 font-medium text-gray-500 dark:text-gray-400 ${isVertical ? 'xl:text-left' : 'xl:text-center'}`}
                        >
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      {url && (
                        <Link
                          href={`/${path}`}
                          className={`mt-3 grid xl:col-start-1 xl:col-end-4 xl:mt-2 xl:justify-center ${parentClass ? parentClass : ''} ${isVertical ? 'xl:row-start-1 xl:row-end-5' : 'xl:row-start-2 xl:row-end-5'}`}
                          style={parentStyle}
                        >
                          <Image
                            src={url}
                            alt={alt ?? ''}
                            width={width}
                            height={height}
                            className={childClass}
                            style={childStyle}
                          />
                        </Link>
                      )}
                      <div
                        className={`mt-3 xl:col-start-4 xl:col-end-9 ${isVertical ? 'xl:row-start-2 xl:row-end-3 xl:mt-3' : 'xl:row-start-1 xl:row-end-3 xl:mt-0'}`}
                      >
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                        </div>
                      </div>
                      <div className="prose mt-3 max-w-none text-gray-500 xl:col-start-4 xl:col-end-9 xl:row-start-3 xl:row-end-5 dark:text-gray-400">
                        {summary}
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
        </div>
      </div>
    </>
  )
}
