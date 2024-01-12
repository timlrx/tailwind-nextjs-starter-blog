import Link from '@/components/Link'
import Image from 'next/image'
import { Post } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'

const PostCard = ({ post, tag }: { post: CoreContent<Post>; tag?: 'plog' }) => {
  const { slug, date, title, summary, tags, image } = post
  return (
    <Link href={`/blog/${slug}`}>
      <article
        className={`mx-auto overflow-hidden rounded-xl shadow-md duration-300 hover:scale-105 dark:bg-dark-100
        ${tag !== 'plog' ? 'flex flex-row-reverse items-center justify-between' : ''}`}
      >
        {(tag === 'plog' || image) && (
          <Image
            src={image || post.structuredData.image}
            className={`${
              tag !== 'plog' ? 'aspect-square h-24 w-24' : 'aspect-video w-full object-cover'
            }`}
            width={356}
            height={200}
            alt=""
          />
        )}
        <div className="flex-1 p-3">
          <h2 className="text-xl font-extrabold">{title || slug}</h2>
          <section className="text-gray-500">
            <p>{summary}</p>
          </section>
          <span className="ml-1 text-sm font-bold text-gray-600">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(
                siteMetadata.locale,
                siteMetadata.postDateTemplate
              )}
            </time>
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            {tags &&
              tags.map((tag) => (
                <div
                  key={tag}
                  className={
                    'rounded-md border-2 bg-gradient-to-r from-lime-500 to-yellow-400 bg-clip-text px-2 text-sm font-bold text-transparent'
                  }
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
