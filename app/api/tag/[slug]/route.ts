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
  return Response.json({ data: filteredPosts })
}

// Hàm để tạo các tham số tĩnh cho slug
export async function generateStaticParams() {
  const slugs = allBlogs.flatMap((post) => {
    return post.tags.map((tag) => slugFn(tag)) // Chuyển các tag thành slug
  })
  return slugs.map((slug) => ({ slug })) // Tạo một đối tượng cho mỗi slug
}
