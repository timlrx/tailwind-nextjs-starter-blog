import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import BlogLayout from '@/layouts/BlogLayout'
import { PageSeo } from '@/components/SEO'

export const POSTS_PER_PAGE = 3

export async function getStaticProps() {
  const getPosts = await getAllFilesFrontMatter('blog')
  const posts = getPosts.splice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(getPosts.length / POSTS_PER_PAGE) + 1,
  }

  return { props: { posts, pagination } }
}

export default function Blog({ posts, pagination }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <BlogLayout posts={posts} pagination={pagination} title="All Posts" />
    </>
  )
}
