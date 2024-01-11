export type PageLayout = 'AuthorLayout' | 'PostLayout' | 'PostSimple'

export interface FrontMatter {
  fileName?: string
  layout?: PageLayout
  title?: string
  name?: string
  date?: string
  lastmod?: string
  tags?: string[]
  draft?: boolean
  summary?: string
  image?: string
  authors?: string[]
  slug?: string
  imgProps?
}
