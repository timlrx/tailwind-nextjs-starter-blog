import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ComponentMap } from 'pliny/mdx-components'
import { TOCInline } from 'pliny/ui/TOCInline'
import Pre from './Pre'
import BlogNewsletterForm from './BlogNewsletterForm'
// import { BlogNewsletterForm } from 'pliny/ui/NewsletterForm'

import Image from './Image'
import CustomLink from './Link'

interface MdxProps {
  code: string
  [key: string]: any
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
}

export function Mdx({ code, ...rest }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={{ ...MDXComponents }} {...rest} />
}
