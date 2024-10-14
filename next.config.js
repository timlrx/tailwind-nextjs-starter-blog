const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextTranslate = require("next-translate-plugin")

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app *.crisp.chat *.google.com *.youtube.com *.segment.com *.googletagmanager.com https://*.googletagmanager.com;
  style-src 'unsafe-inline' *.crisp.chat *.axolo.co axolo.co *.google.com;
  img-src * blob: data: *.crisp.chat *.google-analytics.com https://*.google-analytics.com *.googletagmanager.com https://*.googletagmanager.com *.google.com;
  media-src *.crisp.chat *.google.com;
  connect-src * *.crisp.chat  wss://client.relay.crisp.chat wss://stream.relay.crisp.chat *.google-analytics.com https://*.google-analytics.com *.analytics.google.com https://*.analytics.google.com *.googletagmanager.com https://*.googletagmanager.com *.google.com;
  font-src 'self' *.crisp.chat;
  frame-src giscus.app  *.crisp.chat *.youtube.com *.google.com; // Ensure this line is correct
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

module.exports = nextTranslate(
  withBundleAnalyzer({
    basePath: "/blog",
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "md", "mdx"],
    images: {
      domains: [
        "apichaos.s3.eu-west-3.amazonaws.com",
        "axolo.s3.eu-west-3.amazonaws.com",
        "datatribes-bucket.s3.eu-west-3.amazonaws.com",
      ],
    },
    eslint: {
      dirs: ["pages", "components", "lib", "layouts", "scripts"],
    },
    env: {
      CRISP_WEBSITE_ID: process.env.CRISP_WEBSITE_ID,
      SEGMENT_API_KEY: process.env.SEGMENT_API_KEY,
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ]
    },
    webpack: (config, { dev, isServer }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      })

      if (!dev && !isServer) {
        // Replace React with Preact only in client production build
        Object.assign(config.resolve.alias, {
          "react/jsx-runtime.js": "preact/compat/jsx-runtime",
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        })
      }

      return config
    },
    async redirects() {
      return [
        {
          source: "/p/gitlab-self-managed-slack-integrations",
          destination: "/p/gitlab-cicd-pipeline-slack-notifications",
          permanent: true,
        },
        {
          source: "/blog/p/gitlab-self-managed-slack-integrations",
          destination: "/blog/p/gitlab-cicd-pipeline-slack-notifications",
          permanent: true,
        },
        {
          source: "/blog/p/",
          destination: "/blog",
          permanent: true,
        },
        {
          source: "/p/",
          destination: "/",
          permanent: true,
        },
        {
          source: "/p/2023-11-01-changelog copy",
          destination: "/p/2023-11-01-changelog",
          permanent: true,
        },
        {
          source: "/blog/p/2023-11-01-changelog copy",
          destination: "/blog/p/2023-11-01-changelog",
          permanent: true,
        },
        {
          source: "/blog/p/Github-4-ways-to-subscribe-to-pull-requests",
          destination: "/blog/p/github-4-ways-to-subscribe-to-pull-requests",
          permanent: true,
        },
        {
          source: "/blog/p/MixPanel-groupId-Segment-collaborative-SaaS",
          destination: "/blog/p/mixpanel-groupid-segment-collaborative-saas",
          permanent: true,
        },
        {
          source: "/blog/p/8-key-takeaways-from-tim-glaser-cto-of-postHog",
          destination: "/blog/p/8-key-takeaways-from-tim-glaser-cto-of-posthog",
          permanent: true,
        },
        {
          source: "/blog/p/how-we-use-Axolo",
          destination: "/blog/p/how-we-use-axolo",
          permanent: true,
        },
        {
          source: "/p/Github-4-ways-to-subscribe-to-pull-requests",
          destination: "/p/github-4-ways-to-subscribe-to-pull-requests",
          permanent: true,
        },
        {
          source: "/p/MixPanel-groupId-Segment-collaborative-SaaS",
          destination: "/p/mixpanel-groupid-segment-collaborative-saas",
          permanent: true,
        },
        {
          source: "/p/8-key-takeaways-from-tim-glaser-cto-of-postHog",
          destination: "/p/8-key-takeaways-from-tim-glaser-cto-of-posthog",
          permanent: true,
        },
        {
          source: "/p/how-we-use-Axolo",
          destination: "/p/how-we-use-axolo",
          permanent: true,
        },
      ]
    },
  })
)
