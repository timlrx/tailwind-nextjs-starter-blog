import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'

const blueBg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsvvyqHgAGwgK5q3enYQAAAABJRU5ErkJggg=='
const GreenBg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNc+G5vPQAHUQLNdIrxpAAAAABJRU5ErkJggg=='
const yellowBg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP89v1IPQAIzgMyJDClsAAAAABJRU5ErkJggg=='
const pinkBg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8du1aPQAIjwMj1XfeNgAAAABJRU5ErkJggg=='
const purpleBg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsW/6yHgAGiAKf/Hg8WgAAAABJRU5ErkJggg=='

const rangeColors = [blueBg, GreenBg, yellowBg, pinkBg, purpleBg]

const getbg = (str: string): string => {
  // 计算str的hash,选取rangeColors中的任一个
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  hash = Math.abs(hash) // Ensure hash is non-negative
  const index = hash % rangeColors.length // Get index within the range of available colors
  return rangeColors[index]
}

export default function PostLayout({ content, children }) {
  const { date, title, image, tags, filePath } = content

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
              {image && (
                <Image
                  className="rounded-xl"
                  src={image}
                  width={1600}
                  height={900}
                  alt=""
                  placeholder="blur"
                  blurDataURL={getbg(image)}
                />
              )}
            </div>
          </header>
          <div className="prose max-w-none py-8 dark:prose-dark lg:prose-lg prose-img:rounded-xl">
            {children}
          </div>
        </div>
        {/* Edit This Bolg */}
        <Link
          className="fixed bottom-20 right-8 cursor-pointer"
          target="_blank"
          href={`https://github.com/HansKing98/hans-nextjs-blog/edit/main/data/${filePath}`}
        >
          <Image src="/button/edit.svg" alt="" width={140} height={30} />
        </Link>
      </article>
    </SectionContainer>
  )
}
