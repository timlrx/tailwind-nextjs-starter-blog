interface Course {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const coursesData: Course[] = [
  {
    title: 'Math for Data Science Masterclass',
    description: `Probability, statistics, normal distribution and other concepts used often in data science`,
    imgSrc: '/static/images/math_for_data_science.svg',
    href: 'https://www.udemy.com/course/math-for-data-science-masterclass/',
  },
  {
    title: 'Mathematical Foundations of Machine Learning',
    description: `Linear algebra and calculus used in machine learning`,
    imgSrc: '/static/images/mathematical_foundations.svg',
    href: 'https://www.udemy.com/course/machine-learning-data-science-foundations-masterclass/',
  },
  {
    title: 'Apache Kafka Series - Learn Apache Kafka for Beginners v3',
    description: `Kafka fundamentals`,
    imgSrc: '/static/images/kafka.svg',
    href: 'https://www.udemy.com/course/apache-kafka/',
  },
  {
    title: 'Deep Learning Academy',
    description: `Polish course published in InfoShare Academy. There are two parts - Deep learning basics and Computer Vision`,
    imgSrc: '/static/images/machine_learning.svg',
    href: 'https://www.akademiadeeplearning.pl/',
  },
  {
    title: 'The Complete Python Bootcamp From Zero to Hero',
    description: `Python language fundamentals`,
    imgSrc: '/static/images/python.svg',
    href: 'https://www.udemy.com/course/complete-python-bootcamp/',
  },
  {
    title: 'The Complete Flutter Development Bootcamp with Dart',
    description: `Flutter course, used by me to know the language and framework for my mobile application`,
    imgSrc: '/static/images/flutter.svg',
    href: 'https://www.udemy.com/course/flutter-bootcamp-with-dart/',
  },
  {
    title: 'Affinity Photo: Master Photo Editing in Affinity Photo 2',
    description: `Affinity Photo 2 course - cheaper Photoshop alternative`,
    imgSrc: '/static/images/affinity_photo.svg',
    href: 'https://www.udemy.com/course/affinity-photo',
  },
  {
    title: 'Docker for Node.js',
    description: `Dockerizing node.js app, best practices to do it`,
    imgSrc: '/static/images/docker_node.svg',
    href: 'https://www.udemy.com/course/docker-mastery-for-nodejs',
  },
  {
    title: 'RxJs 101',
    description: `Reactive extensions for javascript`,
    imgSrc: '/static/images/rx.svg',
    href: 'https://www.udemy.com/course/rxjs-101-course',
  },
  {
    title: 'MobX In Depth With React',
    description: `MobX fundamentals, principles and concepts`,
    imgSrc: '/static/images/mobx.svg',
    href: 'https://www.udemy.com/course/mobx-in-depth-with-react',
  },
  {
    title: 'Progressive Web Apps (PWA) - The Complete Guide',
    description: `PWA concepts - app manifest, service workers, caching, push notifications and so on.`,
    imgSrc: '/static/images/pwa.svg',
    href: 'https://www.udemy.com/course/progressive-web-app-pwa-the-complete-guide',
  },
  {
    title: 'The Complete React Developer Course',
    description: `Just React, some Redux and a bit of Firebase`,
    imgSrc: '/static/images/react.svg',
    href: 'https://www.udemy.com/course/react-2nd-edition/',
  },
]

export default coursesData
