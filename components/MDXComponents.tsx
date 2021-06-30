import { MDXRemote } from 'next-mdx-remote'
import { ComponentProps } from 'preact'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { PostFrontMatter } from 'types/PostFrontMatter'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
}

interface Props extends Omit<ComponentProps<typeof MDXRemote>, 'compiledSource'> {
  layout: string
  mdxSource: ComponentProps<typeof MDXRemote>
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const LayoutComponent = require(`../layouts/${layout}`).default

  return (
    <LayoutComponent {...rest}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </LayoutComponent>
  )
}
