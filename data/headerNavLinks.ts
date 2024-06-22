const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
  {
    title: 'Dropdown',
    children: [
      { href: '/projects', title: 'Projects' },
      { href: '/about', title: 'About' },
    ],
  },
]

export interface NavItem {
  href?: string
  title: string
  children?: NavItem[]
}

export default headerNavLinks
