interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'HuHu-sovellus',
    description: `HuHu-sovellus on HuHu24 leirille tehty leirisovellus helpottaakseen leirin sisäistä viestintää ja 
    toimintaa. Sovelluksen ominaisuuksia oli muun muassa tiedotteiden julkaiseminen, ilmoituksien lähettäminen, 
    aikataulu ja puutelomake huollolle. Sovelluksen tiimi koostui itseni lisäksi kahdesta kehittäjästä. Johdin projektin
    ja vastasin etenkin arkkitehtuurista ja viestinnästä muun leiriorganisaation kanssa. `,
    imgSrc: 'https://raw.githubusercontent.com/HuHu24/huhu-sovellus/main/public/huhuymp.png',
    href: 'https://github.com/HuHu24/huhu-sovellus',
  },
  {
    title: 'Liveal',
    description: `Liveal on sosiaalisen median alusta, joka on rakennettu oppimistarkoituksiin. Alusta on facebook 
    tyylinen ja sisältää muun muassa suosittelumoottorin ja normaalien postauksien hallinnan ominaisuudet. Toteutin 
    Livealin yksin ja opin projektissa käyttämään Next.js frameworkkia etevästi. Lisäksi sain kosketuksen Rustiin 
    suosittelumoottirin kautta, sillä se oli rakennettu Rust kielellä ja Rocket frameworkilla.`,
    imgSrc:
      'https://raw.githubusercontent.com/Aromiii/Liveal/cce74e52d3709f9f401d4c9cac7e59d1039eb9b7/next/public/livealLogoWithText.svg',
    href: 'https://github.com/Aromiii/Liveal',
  },
  {
    title: 'Pestikome - Kimara2024',
    description: `Pestikone auttaa löytämään osa-alueen, joka vastaa omia vahvuuksiasi, kiinnostustasi ja intohimojasi pestiä varten Kimara 2024 leirillä. Pestikone on toteutettu OpenElectionCompass-projektin pohjalle. `,
    imgSrc: '/static/images/pestikone-kimara.png',
    href: 'https://pestikone.kimara2024.fi',
  },
]

export default projectsData
