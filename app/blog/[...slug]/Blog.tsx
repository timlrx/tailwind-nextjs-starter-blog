'use client'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { MDXComponents } from '@/components/MDXComponents'
import type { Blog } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'PostLayout'

export default function Blog({ post, authorDetails, prev, next }) {
  return (
    <MDXLayoutRenderer
      layout={post.layout || DEFAULT_LAYOUT}
      content={post}
      MDXComponents={MDXComponents}
      toc={post.toc}
      authorDetails={authorDetails}
      prev={prev}
      next={next}
    />
  )
}
