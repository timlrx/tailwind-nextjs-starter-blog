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

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type))
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug}.md`)
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
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, 'data', type))

  const allFrontMatter = files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(path.join(root, 'data', type, postSlug), 'utf8')
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: postSlug.replace(/\.(mdx|md)/, ''),
      },
      ...allPosts,
    ]
  }, [])

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
