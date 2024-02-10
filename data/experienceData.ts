interface ExperienceSectionEntry {
  primaryText: string
  secondaryText: string
  tags?: string[]
  link?: { href: string; text: string }
}

const experienceData: ExperienceSectionEntry[] = [
  {
    primaryText: 'Biot Sp. z o.o',
    secondaryText: '2019 - Present',
    tags: [
      'Typescript',
      'Node.JS',
      'Express.JS',
      'Nest.JS',
      'React',
      'PostgreSQL',
      'RabbitMQ',
      'Redis',
      'ElasticSearch',
      'Material.UI',
      'Mapbox.GL',
      'Deck.GL',
      'Docker',
      'Kubernetes',
    ],
    link: { href: 'https://biotcloud.com', text: 'biotcloud' },
  },
  {
    primaryText: 'Cinkciarz.pl',
    secondaryText: '2015 - 2019',
    tags: ['Java', 'Spring Boot', 'Typescript', 'Angular', 'PostgreSQL', 'Bootstrap', 'Docker'],
    link: { href: 'https://forex.cinkciarz.pl', text: 'Forex' },
  },
  {
    primaryText: 'Trax S.A. / Icomp Sp. z o.o.',
    secondaryText: '2013 - 2015',
    tags: ['Infor Syteline', 'Visual Basic', 'T-SQL'],
  },
]

export default experienceData
