import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import ProfileTable from './ProfileTable'
// import type Horse from '@/types/Horse'
// import { HorseCard } from './HorseCard'
import FamilyTree from './FamilyTree'
import HL from './HorseLink'


export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  ProfileTable,
  // HorseCard,
  FamilyTree,
  HL,
  strong: ({ children }) => <HL name={children as string} />,
}
