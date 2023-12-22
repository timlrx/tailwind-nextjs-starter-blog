// Define a base type for common post fields
export interface BasePost {
  path: string
  slug: string
  date: string
  title: string
  images?: string[]
  tags?: string[]
  filePath: string
  summary?: string
}
