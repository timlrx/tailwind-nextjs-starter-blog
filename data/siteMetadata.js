/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Benjamin Manns Blog',
  author: 'Benjamin Manns',
  headerTitle: 'Benjamin Manns Blog',
  description: 'A blog about software, data, finance, and life.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://www.benmanns.com',
  siteRepo: 'https://github.com/benmanns/benmanns-web',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: 'https://hachyderm.io/@benmanns',
  github: 'https://github.com/benmanns',
  x: 'https://x.com/benmanns',
  linkedin: 'https://www.linkedin.com/in/benmanns',
  threads: 'https://www.threads.net/@benfmanns',
  instagram: 'https://www.instagram.com/benfmanns',
  bluesky: 'https://bsky.app/profile/benmanns.com',
  locale: 'en-US',
  stickyNav: false,
  newsletter: {
    provider: 'convertkit',
  },
  analytics: {},
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '1',
      theme: 'light',
      darkTheme: 'transparent_dark',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
  },
}

module.exports = siteMetadata
