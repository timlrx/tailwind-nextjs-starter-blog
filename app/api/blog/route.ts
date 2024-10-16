import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

export async function GET(req) {
  console.log('inspect.blog')
  const posts = allCoreContent(sortPosts(allBlogs)).filter((post) => post.draft !== true)
  return new Response(JSON.stringify({ posts }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'https://www.example.com',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  })
}
