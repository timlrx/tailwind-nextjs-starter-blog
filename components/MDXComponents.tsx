/* eslint-disable react/display-name */
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ComponentMap } from 'mdx-bundler/client'
import * as temp from '@/lib/utils/temp'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import type { Blog, Authors } from '.contentlayer/types'

interface MDXLayout {
  layout: string
  content: Blog | Authors
  [key: string]: unknown
}

interface Wrapper {
  layout: string
  [key: string]: unknown
}

const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const coreContent = temp.omit(content, ['body', '_raw', '_id'])

  return <MDXLayout layout={layout} content={coreContent} components={MDXComponents} {...rest} />
}
