import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="mx-auto max-w-3xl divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="title">
            <span>Hi, I'm </span>
            <span className="block after:content-['_👋🏼'] sm:inline">Matt Galligan</span>
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I like to build things with technology, and write sometimes.
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            <span className="after:content-['_']">You can learn </span>
            <Link
              rel="me"
              className="font-semibold text-gray-500 underline hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
              href="/about"
            >
              about me
            </Link>
            <span className="after:content-['_']">, or find me on</span>
            <Link
              rel="me"
              className="font-semibold text-sky-500 underline hover:text-sky-300 dark:text-sky-400 dark:hover:text-sky-200"
              href="https://twitter.com/mg"
            >
              Twitter
            </Link>
            <span className="after:content-['_']">, </span>
            <Link
              rel="me"
              className="font-semibold text-purple-800 underline hover:text-purple-500 dark:text-purple-500 dark:hover:text-purple-300"
              href="https://github.com/galligan"
            >
              GitHub
            </Link>
            <span className="after:content-['_']">, </span>
            <Link
              rel="me"
              className="font-semibold text-red-500 underline hover:text-red-300 dark:text-red-400 dark:hover:text-red-300"
              href="https://reddit.com/u/mg0716"
            >
              Reddit
            </Link>
            <span className="after:content-['_']">, and </span>
            <Link
              rel="me"
              className="font-semibold text-slate-600 underline hover:text-slate-400 dark:text-slate-400 dark:hover:text-slate-200"
              href="https://app.ens.domains/name/galligan.eth/details"
            >
              Ethereum
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl divide-y divide-gray-200 dark:divide-gray-700">
        <div className="-mt-3 pb-8">
          <p className="text-lg leading-7 text-gray-500 after:content-['_👇🏼'] dark:text-gray-400 ">
            Here are a few of my latest writings…
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="relative py-8">
                <article>
                  <div className="space-y-1 xl:grid xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-normal leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div>
                      <h2 className="title">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                        >
                          <span className="absolute inset-0" aria-hidden="true"></span>
                          {title}
                        </Link>
                      </h2>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="relative mx-auto flex max-w-3xl justify-end border-t py-8 text-base font-medium leading-6 dark:border-gray-700">
          <Link
            href="/blog"
            className="text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            <span className="absolute inset-0" aria-hidden="true"></span>
            <h2 className="text-xl">Go to all posts &rarr;</h2>
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
