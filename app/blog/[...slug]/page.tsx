import PageTitle from '@/components/PageTitle'
import { Mdx } from '@/components/MDXComponents'
import { sortedBlogPost, coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  const prev = coreContent(sortedPosts[postIndex + 1])
  const next = coreContent(sortedPosts[postIndex - 1])
  const post = sortedPosts.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)

  return (
    <>
      {post && 'draft' in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <PostLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
          <Mdx code={post.body.code} toc={post.toc} />
        </PostLayout>
      )}
    </>
  )
}
