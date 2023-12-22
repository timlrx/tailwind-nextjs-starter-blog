import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs, allReviews } from 'contentlayer/generated'

import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

const getPostsBasedOnType = (tagType: string) => {
  switch (tagType) {
    case 'blog':
      return allBlogs
    case 'reviews':
      return allReviews
    default:
      return allBlogs
  }
}

export default function TagPage({ params }: { params: { tag: string; tagType: string } }) {
  const tag = decodeURI(params.tag)
  const tagType = params.tagType
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const allPosts = getPostsBasedOnType(tagType)
  const filteredPosts = allCoreContent(
    sortPosts(allPosts.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  return <ListLayout posts={filteredPosts} title={title} basePath={tagType} />
}
