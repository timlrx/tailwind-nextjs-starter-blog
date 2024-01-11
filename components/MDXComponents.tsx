import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import Script from 'next/script'
import Emoji from '@/components/twemoji'
import GitHubCard from '@/components/GitHubCard'

export const components: MDXComponents = {
  Image,
  Script,
  TOCInline,
  GitHubCard,
  a: CustomLink,
  pre: Pre,
  Emoji,
}
