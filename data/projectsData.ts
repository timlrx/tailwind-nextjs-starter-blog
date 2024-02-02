interface Series {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Series[] = [
  {
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'Amazon Web Service',
    description: `Các bài viết về AWS`,
    imgSrc: '/static/images/derivong-ols.jpg',
    href: '/blog/nested-route/introducing-multi-part-posts-with-nested-routing/introducing-multi-part-posts-with-nested-routing-copy',
  },
]

export default projectsData
