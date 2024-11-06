import { notFound } from 'next/navigation'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'


export async function generateStaticParams() {
  return allAuthors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const author = allAuthors.find((p) => p.slug === slug) as Authors | undefined

  if (!author) {
    notFound()
  }

  const mainContent = coreContent(author)

  return (
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
  )
}
