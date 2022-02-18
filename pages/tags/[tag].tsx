import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import kebabCase from '@/lib/utils/kebabCase'
import { getAllTags, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'

export async function getStaticPaths() {
  const tags = await getAllTags(allBlogs)

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const tag = context.params.tag as string
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
    )
  )

  return { props: { posts: filteredPosts, tag } }
}

export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
