import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts, Post } from 'contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }

  return {
    title: `${post.title} | HANS`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: post.image,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.image,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allPosts.map((p) => ({ slug: p.slug?.split('/') }))

  return paths
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const sortedPosts = sortPosts(allPosts) as Post[]
  const post = sortedPosts.find((p) => p.slug === slug) as Post
  const mainContent = coreContent(post)
  // console.log('--hans',JSON.stringify(post))
  // console.log('---hans',JSON.stringify(mainContent))
  console.log('---hans')
  return (
    <>
      {post.draft !== true ? (
        <PostLayout content={mainContent}>
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        </PostLayout>
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
