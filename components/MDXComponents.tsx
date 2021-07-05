/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

interface Props {
  layout: string
  mdxSource: string
  frontMatter?: PostFrontMatter
  authorDetails?: AuthorFrontMatter[]
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
