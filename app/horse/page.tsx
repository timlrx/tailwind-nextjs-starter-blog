import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { getHorses } from 'app/lib/api'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function HorsesPage() {
  const horses = await getHorses()
  const pageNumber = 1
  const initialDisplayPosts = horses.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(horses.length / POSTS_PER_PAGE),
  }

  return (
    // <ListLayout
    //   posts={posts}
    //   initialDisplayPosts={initialDisplayPosts}
    //   pagination={pagination}
    //   title="All Posts"
    // />

    // 下記は成功している
    <div>
      <h1>Horse List</h1>
      <div>
        {horses.length}
      </div>
      <ul>
        {horses.map((horse: any) => (
          <li key={horse.id}>
            <a href={`/posts/${horse.id}`}>{horse.attributes.display_name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
