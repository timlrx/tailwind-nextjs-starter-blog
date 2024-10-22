import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { slug as slugFn } from 'github-slugger'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug // 'a', 'b', or 'c'
  const tag = decodeURI(slug)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        return (
          post.tags &&
          post.tags
            .map((t) => {
              // console.log('inspect.post.tag', post.title, '--------', slug(t))
              return slugFn(t)
            })
            .includes(tag)
        )
      })
    )
  )

  if (filteredPosts.length === 0) {
    const result = JSON.stringify({ message: 'No posts tag ' + tag, allBlogs })
    return new Response(result, {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  return new Response(JSON.stringify(filteredPosts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
