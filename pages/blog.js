import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Blog({ posts }) {
  return (
    <>
      <NextSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        canonical={`${siteMetadata.siteUrl}/blog`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/blog`,
          title: `Blog - ${siteMetadata.author}`,
          description: siteMetadata.description,
        }}
      />

      <ListLayout posts={posts} title="All Posts" />
    </>
  )
}
