import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../blog'

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: '' + (i + 2) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const getPosts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const postsPerPage = getPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(getPosts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      postsPerPage,
      pagination,
    },
  }
}

export default function PostPage({ postsPerPage, pagination }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <ListLayout posts={postsPerPage} pagination={pagination} title="All Posts" />
    </>
  )
}
