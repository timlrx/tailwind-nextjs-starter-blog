/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Anime Drift',
  author: 'Anime Enthusiast',
  headerTitle: 'AnimeDrift',
  description:
    'Dive into the world of anime with reviews, news, and discussions. Your portal to new realms!',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://anime-drift.com',
  siteRepo: 'https://github.com/yourusername/anime-drift.com',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'contact@anime-drift.com',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourtwitterhandle',
  facebook: '', // If you don't have these social media accounts, you can leave them empty
  youtube: '',
  linkedin: '',
  locale: 'en-US',
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID, // Set this in your .env.local file
    },
    // Enable other analytics if needed
  },
  newsletter: {
    provider: '', // Set up your preferred newsletter provider
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
    // Enable Algolia if needed
  },
}

module.exports = siteMetadata
