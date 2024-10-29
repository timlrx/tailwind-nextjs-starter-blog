import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import EmblaCarouselItem from '@/components/carousel/EmblaCarouselItem'
import PaperAirplane from '@/components/decoration/PaperAirplane'
import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import { Details, Summary, Content, List, ListItem } from './coffee-time-components'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  EmblaCarousel,
  EmblaCarouselItem,
  PaperAirplane,
  Details,
  Summary,
  Content,
  List,
  ListItem,
}
