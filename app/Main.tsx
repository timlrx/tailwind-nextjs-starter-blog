import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'

const MAX_DISPLAY = 9

export default function Home({ posts }) {
  console.log(posts)
  return (
    <>
      <div className="mt-12">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="flex items-center">
            <h1 className=" text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl md:text-3xl">
              Hi there, I&apos;m{' '}
              <span className="font-sans text-primary-600">{siteMetadata.author}</span> &nbsp;{' '}
            </h1>
            <span className="block transform animate-wave transition duration-100">👋</span>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">{siteMetadata.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images, readingTime } = post
            const imageNotFound = 'https://picsum.photos/seed/picsum/800/400'
            const displayImage = images && images.length > 0 ? images[0] : imageNotFound

            return (
              <div
                className="group overflow-hidden rounded-md border shadow-md hover:shadow-lg dark:border-gray-700"
                key={slug}
              >
                <div className="group relative overflow-hidden rounded-md p-4">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    <Image
                      alt={title}
                      src={displayImage}
                      className="w-full rounded-md object-cover object-center transition duration-300 ease-in-out group-hover:scale-[1.01] md:h-36 lg:h-56"
                      width={400}
                      height={300}
                    />
                    {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent"></div> */}
                  </Link>
                </div>
                <div className="px-4">
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <h2>
                    <Link
                      href={`/blog/${slug}`}
                      className="my-2 inline-block text-xl font-semibold transition duration-500 ease-in-out hover:text-primary-600"
                    >
                      {title}
                    </Link>
                  </h2>
                  <div className="prose mt-2 max-w-none text-sm text-gray-700 dark:text-gray-400">
                    {summary.substring(0, 100) + '...'}
                  </div>
                  <div className="my-4 flex items-center justify-between text-gray-600 dark:text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <span className="text-sm">{formatDate(date, siteMetadata.locale)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span className="text-sm">{`${readingTime.words} words, ${readingTime.text}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="my-12 flex justify-center text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center border-t border-gray-200 pt-4 dark:border-gray-700">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
