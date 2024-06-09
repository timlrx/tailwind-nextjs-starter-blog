const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
]

export const headerNavOptions = { 
  title: 'Dropdown', children: [
    {href: '/projects', title: 'Projects',},
    {href: '/about', title: 'About',},
  ]
}


export default headerNavLinks
