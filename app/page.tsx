import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
