interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Coming Soon',
    description: `Projects coming soon!`,
    imgSrc: '/static/images/arch_2.png',
    href: 'https://www.google.com',
  },
]

export default projectsData
