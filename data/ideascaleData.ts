interface IdeascaleProject {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const ideascaleData: IdeascaleProject[] = [
  {
    title: '[HTLABS] Freelance Connect: Building Trust Between Freelancers and Employers',
    description: `a platform that uses the Cardano blockchain to create secure contracts between freelancers and employers, eliminating trust issues and payment disputes through transparent transactions`,
    imgSrc: 'https://i.imgur.com/0X8uXN9.png',
    href: 'https://cardano.ideascale.com/c/idea/131507',
  },
  {
    title: '[HTLABS] 5 Project templates combining blockchain and internet of things',
    description: ` 5 project templates that combine blockchain and IoT, providing developers with practical examples to improve security, decentralization and scalability in IoT applications using Cardano`,
    imgSrc: 'https://i.imgur.com/vqA3xYl.png',
    href: 'https://cardano.ideascale.com/c/idea/127449',
  },
  {
    title: '🇻🇳 Cardano DApp Development Course: From Zero to Expert!',
    description: `Guiding basic programming from building the frontend, integrating tools like Mesh, Lucid for transactions, and connecting with Aiken smart contracts to build a complete dApp.`,
    imgSrc: 'https://i.imgur.com/IT8Bf46.png',
    href: 'https://cardano.ideascale.com/c/idea/128025',
  },
  {
    title: '[BUTC] Fueling Growth: Cardano Hackathons to Inspire Startup Success',
    description: `hackathon series with different topics to attract teams with great ideas, thereby helping them in the development process of the project.`,
    imgSrc: 'https://i.imgur.com/9M2eYT0.png',
    href: 'https://cardano.ideascale.com/c/idea/132226',
  },
]

export default ideascaleData
