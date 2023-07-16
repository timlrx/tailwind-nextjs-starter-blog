import ListLayout from '@/layouts/ListLayout'
import { sortedBlogPost } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = sortedBlogPost(allBlogs) as Blog[]
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
