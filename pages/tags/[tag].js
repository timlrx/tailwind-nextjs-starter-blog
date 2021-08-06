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

export async function getStaticPaths({ locales }) {
  const tags = await getAllTags('blog')
  const tagsArray = Object.keys(tags)

  let localesTag = []
  for (var i = 0; i < tagsArray.length; i++) {
    for (var j = 0; j < locales.length; j++) {
      localesTag.push([tagsArray[i], locales[j]])
    }
  }

  return {
    paths: localesTag.map(([tag, l]) => ({
      params: {
        tag,
      },
      locale: l,
    })),
    fallback: false,
  }
}

export async function getStaticProps({ locale, params }) {
  const allPosts = await getAllFilesFrontMatter('blog', locale)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.title}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
