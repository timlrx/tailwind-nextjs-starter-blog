import { TagSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import generateRss from "@/lib/generate-rss"
import { getAllFilesFrontMatter } from "@/lib/mdx"
import { getAllTags } from "@/lib/tags"
import kebabCase from "@/lib/utils/kebabCase"
import fs from "fs"
import path from "path"

const root = process.cwd()

export async function getStaticPaths({ locales, defaultLocale }) {
  const tags = await Promise.all(
    locales.map(async (locale) => {
      const otherLocale = locale !== defaultLocale ? locale : ""
      const tags = await getAllTags("p", otherLocale)
      return Object.entries(tags).map((k) => [k[0], locale])
    })
  )

  return {
    paths: tags.flat().map(([tag, locale]) => ({
      params: {
        tag,
      },
      locale,
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params, defaultLocale, locale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ""
  const allPosts = await getAllFilesFrontMatter("p", otherLocale)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  const rss = generateRss(filteredPosts, locale, defaultLocale, `tags/${params.tag}/feed.xml`)
  const rssPath = path.join(root, "public", "tags", params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(
    path.join(rssPath, `feed${otherLocale === "" ? "" : `.${otherLocale}`}.xml`),
    rss
  )

  // Checking if available in other locale for SEO
  const availableLocales = []
  await locales.forEach(async (ilocal) => {
    const otherLocale = ilocal !== defaultLocale ? ilocal : ""
    const itags = await getAllTags("p", otherLocale)
    Object.entries(itags).map((itag) => {
      if (itag[0] === params.tag) availableLocales.push(ilocal)
    })
  })

  return { props: { posts: filteredPosts, tag: params.tag, locale, availableLocales } }
}

export default function Tag({ posts, tag, locale, availableLocales }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title[locale]}`}
        description={`${tag} tags - ${siteMetadata.title[locale]}`}
        availableLocales={availableLocales}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
