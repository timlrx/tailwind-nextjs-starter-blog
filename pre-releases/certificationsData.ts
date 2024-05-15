interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const certificationsData: Project[] = [
  {
    title: 'Strapi E-commerce (Backend)',
    description: `Developed an e-commerce backend with strapi, integrated razorpay for payments, made a custom search plugin in strapi, and hosted the service on render.com.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://drip-vault.onrender.com/',
  },
  {
    title: 'Next-js Strapi E-commerce (Frontend)',
    description: `Developed an e-commerce frontend using nextjs and tailwind css, and integrated it with a strapi backend, and accepting payments with razorpay, and dynamically obtaining the carousel data from the strapi backend.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://drip-vault.vercel.app',
  },
  {
    title: 'MERN Stack filtering app',
    description: `Developed a straightforward MERN applications, which implements data  initialization and presented it in a tabular format. It has been incorporated customizable filters for efficient data exploration, available on different pages for different types of data.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/Pancham555/internship-project-1',
  },
  {
    title: 'React Native Base App',
    description: `Developed a foundational onboarding app using React Native. Designed the onboarding UI, login screen, search functionality, result display, and user profile screen. This app can be easily extended for building various applications.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/Pancham555/react-native-base-app',
  },
  {
    title: 'Flask ML Chatbot',
    description: `Built a simple chatbot web chat interface, with Flask, scikit-learn, numpy, pandas, that uses AI to chat with users. The data comes from a data.csv file inside the working directory.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/Pancham555/flask-ml',
  },
  {
    title: 'React Native News App',
    description: `Developed a React Native news app that fetches data from an API and presents it to users. The app also features an integrated weather viewer and a straightforward note-taking functionality.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://drive.google.com/file/d/1fn0xeTFufhmh5DCpU1_znMSmHoiZe8Ve/view?usp=sharing',
  },
  {
    title: 'Simple MERN Stack TODO Application',
    description: `This is a simple todo list application which uses CRUD operation to write, update and delete lists.`,
    // imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/Pancham555/Mern-todo',
  },
]

export default certificationsData
