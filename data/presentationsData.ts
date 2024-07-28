interface Presentation {
    title: string,
    description: string,
    href?: string,
    imgSrc: string,
  }
  
  const presentationsData: Presentation[] = [
    {
      title: 'A Big Ball of Mud',
      description: `Do you know most common architectural pattern in Software development?
      No, it isn't Micro-Services or Eventbus. It is the Big Ball of Mud! because it simply works
      This is a summarizing presentation of one of my favourite papers..`,
      href: 'https://big-ball-of-mud-presentation.vercel.app/1',
      imgSrc: '/static/images/big-ball-of-mud-survivor.png',
    },
  ]
  
  export default presentationsData
  