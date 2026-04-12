interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Fiber',
    description: `React renderer for three.js`,
    imgSrc: '/static/images/fiber-logo.webp',
    href: 'https://docs.pmnd.rs/react-three-fiber',
  },
  {
    title: 'Drei',
    description: `Useful helpers for react-three-fiber`,
    imgSrc: '/static/images/drei-logo.jpeg',
    href: 'https://drei.pmnd.rs',
  },
]

export default projectsData
