import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import Link from 'next/link'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <h1>Authors</h1>
      <div>
        {allAuthors.map((author) => {
          const mainContent = coreContent(author)

          return (
            <div key={author.slug} className="author-card">
              <Link href={`/authors/${author.slug}`}>
                <h2>{author.name}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
