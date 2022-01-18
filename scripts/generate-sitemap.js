const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.js',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'public/tags/**/*.xml',
    '!pages/_*.js',
    '!pages/api',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages/', '/')
                  .replace('data/blog', '/blog')
                  .replace('data/authors', '/authors')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                const route = path === '/index' ? '' : path
                if (page === `pages/404.js` || page === `pages/blog/[...slug].js`) {
                  return
                }
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
