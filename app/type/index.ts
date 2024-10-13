import { icons } from '@/components/common/social-icons'

export type Member = {
  name: string
  github: string
  avatar: string
  company: number
  website: string
  location: string
  email: string
  bio: string
  social: Soclal[]
}
export type Soclal = {
  provider: string
  url: string
}
