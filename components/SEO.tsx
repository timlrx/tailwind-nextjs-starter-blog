import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'

interface PageSeoProps {
  title: string
  description: string
}
export function PageSeo({ title, description }: PageSeoProps) {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`} />
    </Head>
  )
}

interface BlogSeoProps {
  title: string
  summary: string
  date: string
  url: string
  image: string
}

export function BlogSeo(props: BlogSeoProps) {
  const router = useRouter()

  const { title, summary, date, url, image } = props
  const publishedAt = new Date(date).toISOString()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: image,
    datePublished: publishedAt,
    author: siteMetadata.author,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  }

  return (
    <>
      <Head>
        <title>{`${title} | ${siteMetadata.headerTitle}`}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={summary} />
        <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteMetadata.title} />
        <meta property="og:description" content={summary} />
        <meta property="og:title" content={`${title} | ${siteMetadata.headerTitle}`} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteMetadata.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />
        {date && <meta property="article:published_time" content={publishedAt} />}
        <link rel="canonical" href={`${siteMetadata.siteUrl}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
        />
      </Head>
    </>
  )
}
