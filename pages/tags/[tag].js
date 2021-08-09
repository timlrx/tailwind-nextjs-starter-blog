import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths({ locales, defaultLocale }) {
  const tags = await Promise.all(
    locales.map(async (locale) => {
      const otherLocale = locale !== defaultLocale ? locale : ''
      const tags = await getAllTags('blog', otherLocale)
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

export async function getStaticProps({ params, defaultLocale, locale }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const allPosts = await getAllFilesFrontMatter('blog', otherLocale)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  const rss = generateRss(filteredPosts, locale, defaultLocale, `tags/${params.tag}/feed.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(
    path.join(rssPath, `feed${otherLocale === '' ? '' : `.${otherLocale}`}.xml`),
    rss
  )

  return { props: { posts: filteredPosts, tag: params.tag, locale } }
}

export default function Tag({ posts, tag, locale }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo
        title={`${tag} - ${siteMetadata.title[locale]}`}
        description={`${tag} tags - ${siteMetadata.title[locale]}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
