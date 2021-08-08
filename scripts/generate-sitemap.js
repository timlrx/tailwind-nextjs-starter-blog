const fs = require('fs')
const globby = require('globby')
const path = require('path')
const prettier = require('prettier')
const { cpuUsage } = require('process')
const siteMetadata = require('../data/siteMetadata')
const i18nConfig = require('../i18n.json')

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

  const { locales, defaultLocale } = i18nConfig

  const pagesWithLoc = pages
    .map((page) => {
      if (page.includes('pages')) {
        return locales.map((locale) => [page, locale])
      }

      if (page.includes('data') || page.includes('.xml')) {
        for (let i = 0; i < locales.length; i++) {
          if (page.includes(`.${locales[i]}.`)) {
            return [[page, locales[i]]]
          }
        }
        return [[page, defaultLocale]]
      }

      throw new Error('Sitemap case missing, please check scripts/generate-sitemap.js')
    })
    .flat()
    .map(([page, loc]) => [
      (page =
        (loc !== defaultLocale ? `/${loc}` : '') +
        page
          .replace('pages/', '/')
          .replace('data/blog', '/blog')
          .replace('public/', '/')
          .replace('.js', '')
          .replace('.mdx', '')
          .replace('.md', '')
          .replace(`.${loc}`, '')
          .replace('/feed', '')
          .replace('.xml', '')),
      loc,
      false, // Indicate if the element is already present or not
    ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pagesWithLoc
              .map(([path, loc, alreadyPresent]) => {
                // @todo: Can you check especially here ?
                const route = path.includes('/index') ? path.replace('/index', '') : path
                if (
                  path.includes(`/404.js`) ||
                  path.includes(`/blog/[...slug].js`) ||
                  alreadyPresent
                ) {
                  // Not sure about the [...slug] condition...
                  return
                }
                const routeMultiLang = pagesWithLoc.filter(
                  ([ipath, iloc, _]) => ipath.replace(`/${iloc}`, '') == path.replace(`/${loc}`, '')
                )
                routeMultiLang.map((e) => (e[2] = true)) //making allreadyPresnt to true
                if (routeMultiLang.length === 1)
                  return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
                return `
                          <url>
                              <loc>${siteMetadata.siteUrl}${
                  routeMultiLang.filter(([path, loc]) => (loc === defaultLocale ? path : ''))[0][0]
                }</loc>
                  ${routeMultiLang
                    .filter(([path, loc]) => (loc !== defaultLocale ? path : ''))
                    .map(
                      ([xe, xloc]) =>
                        `
                               <xhtml:link 
                               rel="alternate"
                               hreflang="${xloc}"
                               href="${siteMetadata.siteUrl}${xe}"/>
                               `
                    )}
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
