interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Observability project', 
    description: `Reproduce the problem, and then fix it. This is the essence of observability.`,
    imgSrc: '/static/images/blog/open-telemetry.jpeg',
    href: '/blog/open-telemetry',
  },
]

export default projectsData
