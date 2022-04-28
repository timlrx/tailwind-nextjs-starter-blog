import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const ionDetails = await getFileBySlug('authors', ['ion'])
  const iuliaDetails = await getFileBySlug('authors', ['iulia'])
  return { props: { authors: [ionDetails, iuliaDetails] } }
}

export default function About({ authors }) {
  const frontMatters = authors.map(({ mdxSource, frontMatter }) => frontMatter)
  const mdxSource = authors.map(({ mdxSource, frontMatter }) => mdxSource)[0]

  return (
    <MDXLayoutRenderer layout={DEFAULT_LAYOUT} mdxSource={mdxSource} frontMatters={frontMatters} />
  )
}
