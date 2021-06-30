import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps } from 'next'
import { ComponentProps } from 'preact'
import { PostFrontMatter } from 'types/PostFrontMatter'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps: GetStaticProps = async () => {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

interface Props {
  authorDetails: {
    mdxSource: ComponentProps<typeof MDXLayoutRenderer>['mdxSource']
    frontMatter: PostFrontMatter
  }
}

export default function About({ authorDetails }: Props) {
  const { mdxSource, frontMatter } = authorDetails

  return <MDXLayoutRenderer layout={frontMatter.layout || DEFAULT_LAYOUT} mdxSource={mdxSource} />
}
