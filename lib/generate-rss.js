import { escape } from "@/lib/utils/htmlEscaper"
import siteMetadata from "@/data/siteMetadata"

const generateRssItem = (post, locale, defaultLocale) => `
  <item>
    <guid>${siteMetadata.siteUrl}${defaultLocale === locale ? "" : "/" + locale}/blog/${
  post.slug
}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}${defaultLocale === locale ? "" : "/" + locale}/blog/${
  post.slug
}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toLocaleDateString(locale)}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`

const generateRss = (posts, locale, defaultLocale, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title[locale])}</title>
      <link>${siteMetadata.siteUrl}${defaultLocale === locale ? "" : "/" + locale}/blog</link>
      <description>${escape(siteMetadata.description[locale])}</description>
      <language>${locale}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toLocaleDateString(locale)}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page.replace(
  ".xml",
  defaultLocale === locale ? ".xml" : "." + locale + ".xml"
)}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(post, locale, defaultLocale)).join("")}
    </channel>
  </rss>
`
