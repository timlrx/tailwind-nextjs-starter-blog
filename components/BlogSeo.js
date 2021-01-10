import { NextSeo, ArticleJsonLd } from 'next-seo'
import siteMetadata from '@/data/siteMetadata'

const BlogSeo = ({ title, summary, date, url, image }) => {
  const publishedAt = new Date(date).toISOString()
  const featuredImage = {
    url: `${siteMetadata.url}${image}`,
    alt: title,
  }

  return (
    <>
      <NextSeo
        title={`${title} – ${siteMetadata.title}`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedAt,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/favicons/android-chrome-96x96.png"
        publisherName={siteMetadata.author}
        title={title}
        url={url}
      />
    </>
  )
}

export default BlogSeo
