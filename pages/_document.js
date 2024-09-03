import Document, { Html, Head, Main, NextScript } from "next/document"
class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/blog/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/blog/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/blog/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/blog/static/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/blog/static/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#603cba" />
          <meta name="theme-color" content="#0049ff" />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="/blog/static/favicons/feed.xml"
            itemProp="url"
          />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
