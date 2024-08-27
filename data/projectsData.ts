interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'goworker',
    description: `goworker is a Go-based background worker that runs 10 to 100,000* times faster than Ruby-based workers.`,
    imgSrc: '/static/images/goworker.png',
    href: 'https://www.goworker.org/',
  },
]

export default projectsData
