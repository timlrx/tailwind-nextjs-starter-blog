import { MDXRemote } from 'next-mdx-remote'
import { MDXComponents } from '@/components/MDXComponents'
import AuthorLayout from '@/layouts/AuthorLayout'
import { getFileBySlug } from '@/lib/mdx'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <AuthorLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </AuthorLayout>
  )
}
