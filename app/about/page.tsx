import { Authors, allAuthors } from 'contentlayer/generated'
import { Mdx } from '@/components/MDXComponents'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <Mdx code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
