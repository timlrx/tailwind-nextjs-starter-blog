import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const authorDetails = await getFileBySlug('authors', [`sparrowhawk`], otherLocale)
  return { props: { authorDetails, otherAvailableLocales: locales } }
}

export default function About({ authorDetails, otherAvailableLocales }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      otherAvailableLocales={otherAvailableLocales}
    />
  )
}
