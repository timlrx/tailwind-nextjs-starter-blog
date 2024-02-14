interface Blog {
    title: string,
    description: string,
    href?: string,
    imgSrc?: string,
  }
  
  const blogData: Blog[] = [
    {
      title: 'Giới Thiệu Các Service Chính Của AWS',
      description: `What if you could look up any information in the world? Webpages, images, videos
      and more. Google has many features to help you find exactly what you're looking
      for.`,
      imgSrc: '/static/images/google.png',
      href: '/blog/aws/gioi-thieu-cac-service-chinh-aws',
    },
    {
      title: 'Giới thiệu về AWS',
      description: `Các bài viết về AWS`,
      imgSrc: '/static/images/derivong-ols.jpg',
      href: '/blog/aws/gioi-thieu-ve-aws',
    },
    {
      title: 'AWS Route 53',
      description: `Domain Name System`,
      imgSrc: '/static/images/route-53.jpg',
      href: '/blog/aws/global-infrastructure-cua-AWS',
    },
  ]
  
  export default blogData
  