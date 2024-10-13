'use server'
import { Member } from 'app/type'
import axios from 'axios'
export const getGithubMember = async (): Promise<Member[]> => {
  const githubAccessToken: string = process.env.GH_TOKEN || ''
  const query: string = `
    query 
{
  organization(login: "htlabs-xyz") {
    membersWithRole(first: 100) {
      edges {
        node {
          login
          name
          avatarUrl
          email
          company
          location
          bio
          websiteUrl
          socialAccounts(first: 5) {
            edges {
              node {
                provider
                url
              }
            }
          }
        }
      }
    }
  }
}
  `

  const { data } = await axios.post(
    'https://api.github.com/graphql',
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${githubAccessToken}`,
      },
    }
  )
  if (data.errors) {
    throw new Error(data.errors[0].message)
  }
  return data.data.organization.membersWithRole.edges.map((edge) => {
    const node = edge.node
    return {
      name: node.name,
      github: node.login,
      avatar: node.avatarUrl,
      company: node.company,
      website: node.websiteUrl,
      location: node.location,
      email: node.email,
      bio: node.bio,
      social: node.socialAccounts.edges.map((edge) => {
        if (edge.node.provider === 'GENERIC' && edge.node.url.includes('https://t.me/')) {
          return {
            provider: 'telegram',
            url: edge.node.url,
          }
        }
        return {
          provider: edge.node.provider.toLowerCase(),
          url: edge.node.url,
        }
      }),
    } as Member
  })
}
