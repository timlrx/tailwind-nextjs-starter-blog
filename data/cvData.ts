import { CV } from '../types/cv'
import fieldTypes from 'rehype-citation/node/src/citation-js/plugin-bibtex/input/fieldTypes'
import title = fieldTypes.title

const cvData: CV = {
  education: [
    {
      schoolName: 'Hyvinkään lukio - Kipinä',
      title: 'Ylioppilastutkinto',
      startDate: new Date(2023, 8),
    },
  ],
  experience: [
    {
      company: 'Kevytyrittäjä',
      positions: [
        {
          title: 'Maanmittaaja',
          startDate: new Date(2024, 6),
          endDate: new Date(2024, 6),
          skills: ['Työturvallisuus', 'Maanmittaus'],
        },
      ],
    },
  ],
  volunteerExperience: [
    {
      company: 'Suomen Partiolaiset - Finlands Scouter ry',
      companyLogoImgSrc: '/static/images/partio_sp.svg',
      positions: [
        {
          title: 'Vaalitoimikunnan jäsen',
          startDate: new Date(2024, 3),
        },
        {
          title: 'Digiryhmän jäsen',
          startDate: new Date(2023, 11),
        },
        {
          title: 'Sovelluskehittäjäexpertti | Explo 2023',
          startDate: new Date(2023, 3),
          endDate: new Date(2024, 10),
        },
        {
          title: 'Sisällöntuottaja | Johtajatulet 2023',
          startDate: new Date(2023, 4),
          endDate: new Date(2023, 8),
        },
      ],
    },
    {
      company: 'Partiojournalistit ry',
      companyLogoImgSrc: '/static/images/partio_journalistit.jpg',
      positions: [
        {
          title: 'Projektipäällikkö | Riippari-sovellus',
          startDate: new Date(2024, 4),
        },
      ],
    },
    {
      company: 'Lounais-Suomen Partiopiiri ry',
      companyLogoImgSrc: '/static/images/partio_lsp.jpg',
      positions: [
        {
          title: 'Brändimestari | HuHu24',
          startDate: new Date(2023, 10),
        },
      ],
    },
    {
      company: 'Pohjanmaan Partiolaiset ry',
      companyLogoImgSrc: '/static/images/partio_pohjanmaa.png',
      positions: [
        {
          title: 'Webmaster | Orbis2025',
          startDate: new Date(2024, 3),
        },
      ],
    },
    {
      company: 'Pääkaupunkiseudun Partiolaiset ry',
      companyLogoImgSrc: '/static/images/partio_papa.jpg',
      positions: [
        {
          title: 'Analytiikkamestari | Kimara2024',
          startDate: new Date(2023, 11),
        },
      ],
    },
    {
      company: 'Uudenmaan Partiopiiri ry',
      companyLogoImgSrc: 'https://uusimaa.kuvat.fi/kansiot/LOGOT/Kokkalogo.png?img=smaller',
      positions: [
        {
          title: 'Hautomon jäsen',
          startDate: new Date(2022, 10),
        },
        {
          title: 'Viestintä ja markkinointiryhmän jäsen',
          startDate: new Date(2022, 12),
          endDate: new Date(2023, 10),
        },
      ],
    },
    {
      company: 'Hyvinkään Nummenpojat ry',
      companyLogoImgSrc:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnummenpojat.fi%2Fwp-content%2Fuploads%2F2023%2F03%2Fcropped-HN-reunaton-logo-png.png&f=1&nofb=1&ipt=b2f1004c1317e68be4f4060b38526d2360cb4502b74af455b179af87672741f5&ipo=images',
      positions: [
        {
          title: 'Retkenjohtaja | TaSaVa 14',
          startDate: new Date(2023, 8),
          endDate: new Date(2023, 10),
        },
        {
          title: 'Hallituksen jäsen, Viestintä ja markkinointi',
          startDate: new Date(2023, 1),
        },
        {
          title: 'Viestintä ja markkinointijohtaja',
          startDate: new Date(2022, 11),
          skills: [
            'Markkinointistrategia',
            'Johtaminen',
            'Viestintä',
            'Johtaminen',
            'Viestintä',
            'Johtaminen',
            'Viestintä',
            'Johtaminen',
            'Viestintä',
          ],
        },
        {
          title: 'Ryhmänjohtaja',
          startDate: new Date(2022, 9),
        },
      ],
    },
    {
      company: 'Hyvinkään lukio',
      positions: [
        {
          title: 'Oppilaskunnan hallituksen jäsen',
          startDate: new Date(2024, 1),
        },
      ],
    },
  ],
  coursesLicensesAndCertifications: [
    {
      title: 'PSK 6803 Työturvallisuus',
      issueDate: new Date(2024, 5),
      issuerName: 'Verkkokoulu.com',
      issuerLogo: '/static/images/verkkokoulu.jpg',
    },
    {
      title: 'Young spokespeople -kurssi',
      issuerName: 'Suomen Partiolaiset - Finlands Scouter ry',
      issueDate: new Date(2023, 1),
      issuerLogo: '/static/images/partio_sp.svg',
    },
    {
      title: 'Ryhmänohjaajakoulutus',
      issueDate: new Date(2023, 3),
      issuerName: 'Hyvinkään Nummenpojat ry',
      issuerLogo:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnummenpojat.fi%2Fwp-content%2Fuploads%2F2023%2F03%2Fcropped-HN-reunaton-logo-png.png&f=1&nofb=1&ipt=b2f1004c1317e68be4f4060b38526d2360cb4502b74af455b179af87672741f5&ipo=images',
    },
    {
      title: 'Turvallisesti yhdessä -verkkokurssi',
      issuerName: 'Suomen Partiolaiset - Finlands Scouter ry',
      issueDate: new Date(2022, 6),
      issuerLogo: '/static/images/partio_sp.svg',
    },
  ],
}

export default cvData
