import siteMetadata from '@/data/siteMetadata'

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}${post.slug}</guid>
    <title>${post.title}</title>
    <link>${siteMetadata.siteUrl}${post.slug}</link>
    <description>${post.summary}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`

const generateRss = (posts) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${siteMetadata.title}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${siteMetadata.description}</description>
      <language>${siteMetadata.language}</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/index.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss
