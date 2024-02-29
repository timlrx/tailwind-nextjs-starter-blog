import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFootnotes from 'remark-footnotes'
import {
  extractTocHeadings,
  remarkCodeTitles,
  remarkExtractFrontmatter,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import octicons from '@primer/octicons'
import { pinyin } from 'pinyin-pro'

const root = process.cwd()

const getChinesePath = (doc) => {
  const slut = doc._raw.flattenedPath.replace(/^.+?(\/)/, '')
  return pinyin(slut, { toneType: 'none', nonZh: 'consecutive', separator: '-' })
    .replace(/[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]/g, '') // url 标准符号
    .replaceAll(/-+/g, '-')
    .replace(/(-\/s)|(\/-)|(-$)/g, '') // /- -/ 或者结尾-
}

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => getChinesePath(doc),
  },
  path: {
    type: 'string',
    resolve: (doc) => 'blog/' + getChinesePath(doc),
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across posts posts and write to json file
 */
function createTagCount(allPosts) {
  const tagCount: Record<string, number> = {}
  allPosts.forEach((file) => {
    if (file.tags && file.draft !== true) {
      if (file.tags.includes('plog')) {
        return
      }
      file.tags.forEach((tag) => {
        const formattedTag = tag
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

function createPlogTagCount(allPosts) {
  const tagCount: Record<string, number> = {}
  allPosts.forEach((file) => {
    if (file.tags && file.draft !== true) {
      if (!file.tags.includes('plog')) {
        return
      }
      file.tags.forEach((tag) => {
        const formattedTag = tag
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-plog-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allPosts) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allPosts)))
    )
    console.log('Local search index generated...')
  }
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    image: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    categories: { type: 'list', of: { type: 'string' } },
    slug: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: siteMetadata.siteUrl + '/blog/' + getChinesePath(doc),
        author: doc.authors,
      }),
    },
  },
}))

const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link-placeholder">
    ${octicons.link.toSVG()}
  </span>
  `,
  { fragment: true }
)

export default makeSource({
  contentDirPath: 'data',
  contentDirExclude: ['tofu.json'],
  documentTypes: [Post],
  mdx: {
    // cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkFootnotes,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allPosts } = await importData()
    createTagCount(allPosts)
    createPlogTagCount(allPosts)
    createSearchIndex(allPosts)
  },
})
