interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Orgchart',
    description: `Have you ever tried to figure out how the org is strucutred and ended up in crawling
    in the deepest vaults of the intranet in some nasty .ppt files? If the answer is yes,
    then this project could be interesting for you.`,
    imgSrc: '/static/images/orgchart.png',
    href: 'https://github.com/raven-rwho/orgchart',
  },
]

export default projectsData
