import fs from 'fs'
import matter from 'gray-matter'
import visit from 'unist-util-visit'
import path from 'path'
import readingTime from 'reading-time'
import renderToString from 'next-mdx-remote/render-to-string'

import MDXComponents from '@/components/MDXComponents'
import imgToJsx from './img-to-jsx'

const root = process.cwd()

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
}

/**
 * @param {string} type
 * @returns {string[]}
 */
export function getFiles(type) {
  const folders = path.join(root, 'data', type)
  const files = getAllFilesRecursively(folders).map((a) => a.slice(folders.length + 1))
  return files
}

/** @type {(slug:string)=>string} */
export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

/**
 * @param {string} type
 * @param {string[]} slug // maybe need to consider remaining to paths
 */
export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, 'data', type, `${slug?.join('/')}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug?.join('/')}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-code-titles'),
        require('remark-math'),
        imgToJsx,
      ],
      inlineNotes: true,
      rehypePlugins: [
        require('rehype-katex'),
        require('@mapbox/rehype-prism'),
        () => {
          return (tree) => {
            visit(tree, 'element', (node, index, parent) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [tokenClassNames[type]]
              }
            })
          }
        },
      ],
    },
  })

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...data,
    },
  }
}

/**
 *
 * @param  {...string} folders
 * @returns {string[]}
 */
const getAllFilesRecursively = (...folders) => {
  const filesAndSubFolders = fs.readdirSync(path.join(...folders))

  const returner = filesAndSubFolders
    .map((fileOrFolder) => {
      const fullPath = [...folders, fileOrFolder]

      return fs.statSync(path.join(...fullPath)).isFile()
        ? path.join(...fullPath)
        : getAllFilesRecursively(...fullPath)
    })
    .reduce((acc, n) => (Array.isArray(n) ? [...acc, ...n] : [...acc, n]), [])

  return returner
}

export async function getAllFilesFrontMatter(folder) {
  const prefixPaths = [root, 'data']

  const files = getAllFilesRecursively(...prefixPaths, folder)

  const allFrontMatter = []

  files.forEach((file) => {
    const fileName = file.slice(path.join(...prefixPaths, folder).length + 1)
    const source = fs.readFileSync(file, 'utf8')
    const { data } = matter(source)
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(fileName) })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
