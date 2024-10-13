import { genPageMetadata } from 'app/seo'
import GithubMembersPage from '@/components/app/GithubMembersPage'

export const metadata = genPageMetadata({ title: 'Members' })

export default function Page() {
  return <GithubMembersPage />
}
