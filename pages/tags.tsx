import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { allBlogs } from '.contentlayer/data'

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags() {
  const tagCount: Record<string, number> = {}
  // Iterate through each post, putting all found tags into `tags`
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}

export const getStaticProps: GetStaticProps<{ tags: Record<string, number> }> = async () => {
  const tags = await getAllTags()

  return { props: { tags } }
}

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
