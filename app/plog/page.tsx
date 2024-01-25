import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'
import tagData from 'app/tag-plog-data.json'

import { genPageMetadata } from '../seo'

import BlogPage from 'app/blog/blog-page'

export const metadata = genPageMetadata({ title: 'Plog' })
export default async function Page() {
  const sortedPosts = sortPosts(allPosts)
  const posts = allCoreContent(sortedPosts)
  const tags = tagData as Record<string, number>
  return (
    <BlogPage
      tags={tags}
      posts={posts.filter((el) => el.tags && el.tags.includes('plog'))}
      plogTag={true}
    />
  )
}
