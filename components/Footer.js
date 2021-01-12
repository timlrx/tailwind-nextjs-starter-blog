import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center mt-16">
      <div className="flex space-x-4 mb-3">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
        <SocialIcon kind="github" href={siteMetadata.github} size="6" />
        <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
        <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
        <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
        <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
      </div>
      <div className="flex space-x-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{siteMetadata.author}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link href="/">{siteMetadata.title}</Link>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
          Tailwind Nextjs Theme
        </Link>
      </div>
    </footer>
  )
}
