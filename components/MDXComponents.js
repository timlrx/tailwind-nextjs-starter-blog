import Image from 'next/image'
import CustomLink from './Link'
import { Counter } from '../store/Counter'

const MDXComponents = {
  Image,
  a: CustomLink,
  Counter,
}

export default MDXComponents
