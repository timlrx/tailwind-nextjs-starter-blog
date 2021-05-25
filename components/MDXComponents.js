import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import CustomLink from './Link'
import Pre from './Pre'

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const LayoutComponent = require(`../layouts/${layout}`).default

  return (
    <LayoutComponent {...rest}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </LayoutComponent>
  )
}
