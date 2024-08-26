interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'DYWI - Project ',
    description: `언제 어디서든 당신의 날씨를 알려드립니다. `,
    imgSrc: '/static/images/google.png',
    href: '/blog/nested-route/dywi-project',
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

export default projectsData
