import ListLayout from '@/layouts/FamilyListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allFamilies } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'


const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: '牝系一覧' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allFamilies))
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
