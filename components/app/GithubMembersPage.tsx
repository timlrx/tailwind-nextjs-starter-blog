import { Member } from 'app/type'
import MemberLayout from '@/layouts/MemberLayout'
import { getGithubMember } from 'app/actions/getGithubMember'

export default async function GithubMembersPage() {
  const allMembers = await getGithubMember()
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-3xl md:leading-14">
            Members
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {allMembers.map((member: Member) => {
            return (
              <div key={member.github} className="p-4">
                <MemberLayout member={member} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
