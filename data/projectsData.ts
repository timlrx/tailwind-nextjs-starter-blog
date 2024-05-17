interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Soul Rest',
    description: `힐링을 위한 서울시의 각종 명소들을 주제별, 자치구별로 분류해 제공하는 애플리케이션입니다.`,
    imgSrc: '/static/images/soulrest.png',
    href: 'https://github.com/yymin1022/SeoulHealing',
  },
]

export default projectsData
