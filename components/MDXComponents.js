import Image from 'next/image'
import CustomLink from './Link'
import Pre from './Pre'

const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
}

export default MDXComponents
