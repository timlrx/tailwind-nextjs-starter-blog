import Link from 'next/link'
import kebabCase from 'just-kebab-case'
import { NextSeo } from 'next-seo'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import Tag from '@/components/Tag'

export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <NextSeo
        title={`Tags - ${siteMetadata.title}`}
        canonical={`${siteMetadata.siteUrl}/tags`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/tags`,
          title: `Tags - ${siteMetadata.title}`,
        }}
      />
      <div className="flex items-start justify-start flex-col divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="max-w-lg flex flex-wrap">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="m-2">
                <Tag text={t} />
                <Link href={`/tags/${kebabCase(t)}`}>
                  <a className="uppercase font-semibold text-sm mx-1 text-gray-600 dark:text-gray-300">{` (${tags[t]})`}</a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
