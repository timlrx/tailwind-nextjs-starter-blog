const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app *.crisp.chat *.youtube.com *.segment.com;
  style-src 'unsafe-inline' *.crisp.chat;
  img-src * blob: data: *.crisp.chat ;
  media-src *.crisp.chat;
  connect-src * *.crisp.chat  wss://client.relay.crisp.chat wss://stream.relay.crisp.chat;
  font-src 'self' *.crisp.chat;
  frame-src giscus.app  *.crisp.chat ;
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

module.exports = withBundleAnalyzer({
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
})
