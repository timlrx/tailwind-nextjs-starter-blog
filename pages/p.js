import { getAllFilesFrontMatter } from "@/lib/mdx"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"
import useTranslation from "next-translate/useTranslation"

export const POSTS_PER_PAGE = 10

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
}

export default function Blog({ posts, initialDisplayPosts, pagination, locale, availableLocales }) {
  const { t } = useTranslation()
  // we filter to hide changelog articles
  posts = posts.filter((post) => !post?.tags?.includes("changelog"))
  initialDisplayPosts = initialDisplayPosts.filter((post) => !post.tags.includes("changelog"))
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t("common:all")}
      />
    </>
  )
}
