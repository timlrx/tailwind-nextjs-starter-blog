import { allPosts } from 'contentlayer/generated'
import { allCoreContent } from 'pliny/utils/contentlayer'
import tagData from 'app/tag-data.json'
import PostCard from '@/components/PostCard'
import Divider from '@/components/Divider'
import { genPageMetadata } from '../../seo'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  return genPageMetadata({
    title: `Tag - ${tag}`,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }))
  return paths
}

export default function Page({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const filteredPosts = allCoreContent(
    allPosts.filter(
      (post) => post.draft !== true && post.tags && post.tags.map((t) => t).includes(tag)
    )
  )
  return (
    <>
      <span
        className={
          'rounded-md border-2 bg-gradient-to-r from-lime-500 to-yellow-400 bg-clip-text px-2 text-sm font-bold text-transparent'
        }
      >
        {tag}
      </span>
      <Divider />
      {/*<ListLayout posts={posts} title={title} />*/}
      <ol className={'grid gap-6 lg:grid-cols-2'} style={{ listStyle: `none` }}>
        {filteredPosts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ol>
    </>
  )
}
