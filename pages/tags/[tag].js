import kebabCase from 'just-kebab-case'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Blog({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/tags/${tag}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
