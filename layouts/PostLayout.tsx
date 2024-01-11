import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'

export default function PostLayout({ content, children }) {
  const { date, title, image, tags } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="mx-auto xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="my-3 flex flex-col justify-center gap-3 lg:flex-row">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        siteMetadata.postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
                <div className="flex flex-row justify-center space-x-3">
                  {tags &&
                    tags.map((tag) => (
                      <Link
                        key={tag}
                        className={
                          'rounded-md border-2 bg-gradient-to-r from-lime-500 to-yellow-400 bg-clip-text px-2 text-sm font-bold text-transparent hover:text-gray-500'
                        }
                        href={`/tags/${tag}`}
                      >
                        {tag}
                      </Link>
                    ))}
                </div>
              </dl>
              <Image className="rounded-xl" src={image} width={1600} height={900} alt="" />
            </div>
          </header>
          <div className="prose max-w-none py-8 dark:prose-dark lg:prose-lg prose-img:rounded-xl">
            {children}
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
