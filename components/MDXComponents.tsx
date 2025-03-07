import TOCInline from 'pliny/ui/TOCInline'
// import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import PreviewableCode from './PreviewableCode'
import Mermaid from './Mermaid'
import PlantUML from './PlantUML'

// Configure available renderers
const renderers = {
  mermaid: Mermaid,
  plantuml: PlantUML,
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: (props) => <PreviewableCode defaultView={'code'} renderers={renderers} {...props} />,
  table: TableWrapper,
  BlogNewsletterForm,
}
