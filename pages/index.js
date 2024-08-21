import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import formatDate from "@/lib/utils/formatDate"
import Image from "next/image"
import NewsletterForm from "@/components/NewsletterForm"
import useTranslation from "next-translate/useTranslation"
import ListLayout from "@/layouts/ListLayout"
import { POSTS_PER_PAGE } from "./p"

const postDateTemplate = { year: "numeric", month: "long", day: "numeric" }

const MAX_DISPLAY = 5

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ""
  const posts = await getAllFilesFrontMatter("p", otherLocale)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: { initialDisplayPosts, posts, pagination, locale, availableLocales: locales },
  }
  // return { props: { posts, locale, availableLocales: locales } }
}

export function WithImage({ image, date, alt }) {
  return (
    <div className="flex flex-col">
      <div className="flex  justify-center pb-4  xl:block xl:justify-start xl:pb-0">
        <Image width={220} height={146} src={image} alt={alt} />
      </div>
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date)}</time>
        </dd>
      </dl>
    </div>
  )
}

export default function Home({ posts, initialDisplayPosts, pagination, locale, availableLocales }) {
  const { t } = useTranslation()
  // we filter to hide changelog articles
  posts = posts.filter((post) => !post?.tags?.includes("changelog"))
  posts.sort((a, b) => {
    const aDate = a.lastmod || a.date
    const bDate = b.lastmod || b.date

    return new Date(bDate) - new Date(aDate)
  })

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description[locale]} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t("common:greeting")}{" "}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description[locale]}{" "}
          </p>
        </div>
        {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, image, lastmod } = frontMatter
            const dateToFormat = lastmod || date
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    {image ? (
                      <WithImage image={image} date={dateToFormat} alt={title} />
                    ) : (
                      <dl>
                        <dt className="sr-only">{t("common:pub")}</dt>{" "}
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, locale)}</time>{" "}
                        </dd>
                      </dl>
                    )}
                    <div className="!mt-auto space-y-5 xl:col-span-3">
                      <div className="space-y-6 ">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/p/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/p/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          {t("common:more")} &rarr;{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>  */}
      </div>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t("common:all")}
      />
      {/* {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {t("common:all")} &rarr;{" "}
          </Link>
        </div>
      )} */}
      {/* {siteMetadata.newsletter.provider !== "" && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm title={t("newsletter:title")} />{" "}
        </div>
      )} */}
    </>
  )
}
