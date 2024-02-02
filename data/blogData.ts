interface Blog {
    title: string,
    description: string,
    href?: string,
    imgSrc?: string,
  }
  
  const projectsData: Blog[] = [
    {
      title: 'Deriving the OLS Estimator',
      description: `How to derive the OLS Estimator with matrix notation and a tour of math typesetting 
      using markdown with the help of KaTeX.`,
      imgSrc: '/static/images/derivong-ols.jpg',
      href: '/blog/deriving-ols-estimator',
    },
    {
      title: 'The Time Machine',
      description: `Imagine being able to travel back in time or to the future. Simple turn the knob
      to the desired date and press "Go". No more worrying about lost keys or
      forgotten headphones with this simple yet affordable solution.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/the-time-machine',
    },
  ]
  
  export default blogData
  