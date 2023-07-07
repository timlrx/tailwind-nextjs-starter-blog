'use client'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { MDXComponents } from '@/components/MDXComponents'

const DEFAULT_LAYOUT = 'AuthorLayout'

export default function About({ author }) {
  return (
    <MDXLayoutRenderer
      layout={author.layout || DEFAULT_LAYOUT}
      content={author}
      MDXComponents={MDXComponents}
    />
  )
}
