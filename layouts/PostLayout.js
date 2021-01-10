import tinytime from 'tinytime'
import Link from '@/components/Link'

import SectionContainer from '@/components/SectionContainer'
import PageTitle from '@/components/PageTitle'
import BlogSeo from '@/components/BlogSeo'
import Tag from '@/components/Tag'
import siteMetdata from '@/data/siteMetadata'

const editUrl = (slug) => `${siteMetdata.github}/edit/master/data/blog/${slug}.mdx`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetdata.siteUrl}/blog/${slug}`)}`

const postDateTemplate = tinytime('{dddd}, {MMMM} {DD}, {YYYY}')

export default function PostLayout({ children, frontMatter, next, prev }) {
  const { slug, date, title, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSeo url={`${siteMetdata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <article className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>{postDateTemplate.render(new Date(date))}</time>
                </dd>
              </div>
            </dl>
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header>
        <div
          className="divide-y xl:divide-y-0 divide-gray-200 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 pb-8"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
            <dt className="sr-only">Authors</dt>
            <dd>
              <ul className="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8">
                <li className="flex items-center space-x-2">
                  <img src={siteMetdata.image} alt="avatar" className="w-10 h-10 rounded-full" />
                  <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{siteMetdata.author}</dd>
                    <dt className="sr-only">Twitter</dt>
                    <dd>
                      <a
                        href={siteMetdata.twitter}
                        className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {siteMetdata.twitter.replace('https://twitter.com/', '@')}
                      </a>
                    </dd>
                  </dl>
                </li>
              </ul>
            </dd>
          </dl>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
            <div className="prose dark:prose-dark max-w-none pt-10 pb-8">{children}</div>
            <div className="text-sm pt-6 pb-6 text-gray-700 dark:text-gray-300">
              <a href={discussUrl(slug)} target="_blank" rel="noopener noreferrer">
                {'Discuss on Twitter'}
              </a>
              {` • `}
              <a href={editUrl(slug)} target="_blank" rel="noopener noreferrer">
                {'Edit on GitHub'}
              </a>
            </div>
          </div>
          <footer className="text-sm font-medium leading-5 xl:divide-y divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
            {tags && (
              <div className="py-4 xl:py-8">
                <h2 className="text-xs tracking-wide uppercase text-gray-500 dark:text-gray-400">
                  Tags
                </h2>
                <div className="space-x-3 xl:flex xl:flex-col xl:space-x-0">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            )}
            {(next || prev) && (
              <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                {prev && (
                  <div>
                    <h2 className="text-xs tracking-wide uppercase text-gray-500 dark:text-gray-400">
                      Previous Article
                    </h2>
                    <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                      <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                    </div>
                  </div>
                )}
                {next && (
                  <div>
                    <h2 className="text-xs tracking-wide uppercase text-gray-500 dark:text-gray-400">
                      Next Article
                    </h2>
                    <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                      <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="pt-4 xl:pt-8">
              <Link
                href="/blog"
                className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                &larr; Back to the blog
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
