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
  social: Social[]
}
export type Social = {
  provider: string
  url: string
}
