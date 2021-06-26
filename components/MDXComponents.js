import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXComponent = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  const LayoutComponent = require(`../layouts/${layout}`).default

  return (
    <LayoutComponent {...rest}>
      <MDXComponent components={MDXComponents} />
    </LayoutComponent>
  )
}
