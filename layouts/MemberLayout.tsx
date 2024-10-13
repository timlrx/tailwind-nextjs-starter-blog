import Image from '@/components/common/Image'
import SocialIcon, { icons } from '@/components/common/social-icons'
import { Member } from 'app/type'

interface Props {
  member: Member
}

export default function MemberLayout({ member }: Props) {
  const { name, github, avatar, company, website, location, email, bio, social } = member
  return (
    <div className="flex flex-col items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
      <div className="flex h-full items-center justify-center border-t-slate-600 xl:col-span-1">
        {avatar && (
          <Image
            src={avatar}
            alt="avatar"
            width={192}
            height={192}
            className="h-52 w-52 rounded-full"
          />
        )}
      </div>
      <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
        <h3 className="text-2xl font-bold leading-8 tracking-tight">{name}</h3>
        <div className="h-14">{bio}</div>
        <div className="mt-2 text-gray-500 dark:text-gray-400">{company}</div>
        <div className="text-gray-500 dark:text-gray-400">{location}</div>
        <div className="flex space-x-3 pt-6">
          <SocialIcon kind="mail" href={`mailto:${email}`} />
          <SocialIcon kind="github" href={github} />
          <SocialIcon kind="website" href={website} />
          {social.map((s, index) => {
            const kind =
              s.provider.toLocaleLowerCase() in icons
                ? (s.provider.toLocaleLowerCase() as keyof typeof icons)
                : 'website'
            return <SocialIcon key={index} kind={kind} href={s.url} />
          })}
        </div>
      </div>
    </div>
  )
}
