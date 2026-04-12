import { ReactNode } from 'react'
import { slug as slugify } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

const formatAuthorMeta = (author: CoreContent<Authors>) => {
  if (author.occupation && author.company) {
    return `${author.occupation} @ ${author.company}`
  }

  return author.occupation || author.company || null
}

const formatAuthorNames = (authorDetails: CoreContent<Authors>[]) => {
  const names = authorDetails.map((author) => author.name).filter(Boolean)

  if (names.length <= 1) {
    return names[0] || null
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`
  }

  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const byline = formatAuthorNames(authorDetails)

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="pt-6">
            <div className="mx-auto max-w-3xl space-y-6 border-b border-gray-200 pb-10 dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base text-gray-500 dark:text-gray-400">
                    <span>on </span>
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <h1 className="max-w-4xl text-4xl leading-[1] font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl md:text-6xl dark:text-gray-50">
                {title}
              </h1>
              {byline && (
                <p className="text-base text-gray-600 dark:text-gray-400">
                  By <span className="font-medium text-gray-900 dark:text-gray-100">{byline}</span>
                </p>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${slugify(tag)}`}
                      className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:text-gray-950 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </header>
          <div className="mx-auto max-w-3xl pb-12">
            <div className="prose dark:prose-invert max-w-none py-10">{children}</div>
            <footer className="space-y-10 border-t border-gray-200 pt-10 dark:border-gray-700">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <Link href={discussUrl(path)} rel="nofollow">
                    Discuss on Twitter
                  </Link>
                  <Link href={editUrl(filePath)}>View on GitHub</Link>
                </div>
              </div>
              {authorDetails.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                    Author
                  </h2>
                  <ul className="space-y-6">
                    {authorDetails.map((author) => {
                      const authorMeta = formatAuthorMeta(author)
                      const hasSocials = Boolean(
                        author.email ||
                        author.github ||
                        author.linkedin ||
                        author.twitter ||
                        author.youtube ||
                        author.bluesky
                      )

                      return (
                        <li
                          className="rounded-3xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-700 dark:bg-gray-900/40"
                          key={author.slug || author.name}
                        >
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            {author.avatar && (
                              <Image
                                src={author.avatar}
                                width={96}
                                height={96}
                                alt={author.name}
                                className="h-20 w-20 rounded-full object-cover"
                              />
                            )}
                            <div className="min-w-0 flex-1 space-y-3">
                              <div className="space-y-1">
                                <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                                  {author.name}
                                </h3>
                                {authorMeta && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {authorMeta}
                                  </p>
                                )}
                              </div>
                              {author.description && (
                                <p className="max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                                  {author.description}
                                </p>
                              )}
                              {hasSocials && (
                                <div className="flex flex-wrap items-center gap-3">
                                  <SocialIcon
                                    kind="mail"
                                    href={author.email ? `mailto:${author.email}` : undefined}
                                    size={6}
                                  />
                                  <SocialIcon kind="github" href={author.github} size={6} />
                                  <SocialIcon kind="linkedin" href={author.linkedin} size={6} />
                                  <SocialIcon kind="x" href={author.twitter} size={6} />
                                  <SocialIcon kind="youtube" href={author.youtube} size={6} />
                                  <SocialIcon kind="bluesky" href={author.bluesky} size={6} />
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )}
              <section className="space-y-6">
                {(next || prev) && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {prev && prev.path && (
                      <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                        <p className="text-xs tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                          Previous article
                        </p>
                        <Link
                          href={`/${prev.path}`}
                          className="hover:text-primary-500 dark:hover:text-primary-400 mt-3 block text-lg font-medium text-gray-900 transition dark:text-gray-100"
                        >
                          {prev.title}
                        </Link>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                        <p className="text-xs tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
                          Next article
                        </p>
                        <Link
                          href={`/${next.path}`}
                          className="hover:text-primary-500 dark:hover:text-primary-400 mt-3 block text-lg font-medium text-gray-900 transition dark:text-gray-100"
                        >
                          {next.title}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </footer>
            {siteMetadata.comments && (
              <div className="pt-10 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
