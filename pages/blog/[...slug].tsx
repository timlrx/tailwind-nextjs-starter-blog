import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import * as temp from '@/lib/utils/temp'
import { InferGetStaticPropsType } from 'next'
import { allBlogs, allAuthors } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedPosts = temp.sortedBlogPost(allBlogs)
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  // TODO: Refactor this extraction of coreContent
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? temp.coreBlog(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? temp.coreBlog(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === slug)
  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return authorResults
  })

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  }
}

export default function Blog({
  post,
  authorDetails,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {'draft' in post && post.draft !== true ? (
        <MDXLayoutRenderer
          layout={post.layout || DEFAULT_LAYOUT}
          toc={post.toc}
          content={post}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
