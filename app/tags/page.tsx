import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import blogTagData from 'app/blog-tag-data.json'
import reviewTagData from 'app/reviews-tag-data.json'
import newsTagData from 'app/news-tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const blogTagCounts = blogTagData as Record<string, number>
  const reviewTagCounts = reviewTagData as Record<string, number>
  const newsTagCounts = newsTagData as Record<string, number>

  const sortedBlogTags = Object.keys(blogTagCounts).sort(
    (a, b) => blogTagCounts[b] - blogTagCounts[a]
  )
  const sortedReviewTags = Object.keys(reviewTagCounts).sort(
    (a, b) => reviewTagCounts[b] - reviewTagCounts[a]
  )
  const sortedNewsTags = Object.keys(newsTagCounts).sort(
    (a, b) => newsTagCounts[b] - newsTagCounts[a]
  )

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
          Tags
        </h1>

        <div>
          <h2>Blog Tags</h2>
          {renderTags(sortedBlogTags, blogTagCounts, 'blog')}

          <h2>Review Tags</h2>
          {renderTags(sortedReviewTags, reviewTagCounts, 'reviews')}

          <h2>News Tags</h2>
          {renderTags(sortedNewsTags, newsTagCounts, 'news')}
        </div>
      </div>
    </div>
  )
}

function renderTags(sortedTags, tagCounts, tagType) {
  return (
    <div className="flex max-w-lg flex-wrap">
      {sortedTags.length === 0 && 'No tags found.'}
      {sortedTags.map((t) => (
        <div key={t} className="mb-2 mr-5 mt-2">
          <Tag text={t} tagType={tagType} />
          <Link
            href={`/tags/${tagType}/${slug(t)}`}
            className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
            aria-label={`View posts tagged ${t}`}
          >
            {` (${tagCounts[t]})`}
          </Link>
        </div>
      ))}
    </div>
  )
}
