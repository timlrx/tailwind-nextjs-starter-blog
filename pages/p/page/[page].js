import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import ListLayout from "@/layouts/ListLayout"
import { POSTS_PER_PAGE } from ".."
import useTranslation from "next-translate/useTranslation"

export async function getStaticPaths({ locales, defaultLocale }) {
  const paths = (
    await Promise.all(
      locales.map(async (locale) => {
        const otherLocale = locale !== defaultLocale ? locale : ""
        const totalPosts = await getAllFilesFrontMatter("p", otherLocale) // don't forget to useotherLocale
        const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
        return Array.from({ length: totalPages }, (_, i) => [(i + 1).toString(), locale])
      })
    )
  ).flat()
  return {
    paths: paths.map(([page, locale]) => ({
      params: {
        page,
      },
      locale,
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
    defaultLocale,
    locales,
    locale,
  } = context
  const otherLocale = locale !== defaultLocale ? locale : ""
  const posts = await getAllFilesFrontMatter("p", otherLocale)
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  // Checking if available in other locale for SEO
  const availableLocales = []
  await locales.forEach(async (ilocal) => {
    const otherLocale = ilocal !== defaultLocale ? ilocal : ""
    const iAllPosts = await getAllFilesFrontMatter("p", otherLocale)
    iAllPosts.forEach(() => {
      if (
        pageNumber <= Math.ceil(iAllPosts.length / POSTS_PER_PAGE) &&
        !availableLocales.includes(ilocal)
      )
        availableLocales.push(ilocal)
    })
  })

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      locale,
      availableLocales,
    },
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
  locale,
  availableLocales,
}) {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />{" "}
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t("common:all")}
      />
    </>
  )
}
