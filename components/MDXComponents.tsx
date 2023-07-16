import TOCInline from 'pliny/ui/TOCInline'
import Pre from './Pre'
import BlogNewsletterForm from 'pliny/ui/NewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
}
