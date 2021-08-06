import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../blog'

import useTranslation from 'next-translate/useTranslation'

export async function getStaticPaths({ locales }) {
  const totalPosts = await getAllFilesFrontMatter('blog') // don't forget to useotherLocale
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)

  const paths = locales
    .map((l) =>
      Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString() },
        locale: l,
      }))
    )
    .flat()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({ posts, initialDisplayPosts, pagination }) {
  const { t } = useTranslation()
  return (
    <>
      <PageSeo title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('common:all')}
      />
    </>
  )
}
