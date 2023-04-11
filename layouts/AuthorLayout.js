import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      
      {/* create a tailwind row with two column and make them mobile responsive */}
      <div className='columns-2'>
        <div className='flex-1'>
          test
        </div>
        <div className='flex-1'>
          test
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 py-12 flex flex-row space-x-10">
        <div className="w-2/3 pr-8 shrink">
          <div className="prose dark:prose-dark xl:col-span-2">{children}</div>
        </div>
        <div className="w-1/3">
          <div className="rounded-xl relative w-full rotate-2 shadow-lg h-80 mb-8">
            <Image
              src={avatar}
              alt="avatar"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col items-left">
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" text='My Linkedin Profile' />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" text='My Twitter profile'/>
            <SocialIcon kind="github" href={siteMetadata.github} size="5" text='My Github profile' />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size="5" text='My Youtube Channel'/>
            
            <div className="my-8 border-b"></div>
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" text='Email me' />
          </div>
        </div>
      </div>
    </>
  )
}
