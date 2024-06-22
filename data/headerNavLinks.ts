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

type NavItemBase = {
  title: string
}

type NavItemWithHref = NavItemBase & {
  href: string
  children?: never
}

type NavItemWithChildren = NavItemBase & {
  children: NavItemChild[]
  href?: never
}

export interface NavItemChild {
  href: string
  title: string
}

export type NavItem = NavItemWithHref | NavItemWithChildren

export default headerNavLinks
